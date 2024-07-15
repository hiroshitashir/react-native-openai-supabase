import OpenAI from 'openai';
import 'xhr';
import { ChatCompletionMessage } from 'openai/resources/chat/completions';

import { Redis } from 'upstash_redis';
import { Ratelimit } from 'ratelimit';
import { createClient } from 'supabase-js';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

async function saveMessages(
  supabaseClientServiceRole,
  messages: [ChatCompletionMessage],
  userId: Number,
  appType: string
) {
  for (const msg of messages) {
    const { error } = await supabaseClientServiceRole
      .from('message_details')
      .insert({
        ...msg,
        user_id: userId,
        app_type: appType,
      });

    if (error) {
      console.error(`Error in saveMessages:`, error);
    }
  }
}

Deno.serve(async (req) => {
  /***
   * Logic for rate limit
   */
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Now we can get the session or user object
    let {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('no user');

    const redis = new Redis({
      url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
      token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
    });

    // Create a new ratelimiter, that allows 10 requests per 10 seconds
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, '10 s'),
      analytics: true,
    });

    // Use a constant string to limit all requests with a single ratelimit
    // Or use a userID, apiKey or ip address for individual limits.
    const identifier = user.id;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      console.error(`rate limit exceeded for user.id: ${user.id}`);
      return new Response(
        JSON.stringify({ error: 'Too many messages sent.' }),
        {
          status: 429,
        }
      );
    }

    /***
     * Increment message counter
     */
    const supabaseClientServiceRole = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SERVICE_KEY') ?? ''
    );

    const nowDate = new Date();
    const now = nowDate.getTime();
    //const startOfDay = new Date(now - (now % 86400000));
    //const endOfDate = new Date(now - (now % 86400000) + 86400000);
    const delta = 86400000; // 60 * 60 * 24 * 1000 milliseconds = 1 day
    const currStart = new Date(now - delta);
    const MAX_COUNT = 200;

    const { data: msg } = await supabaseClientServiceRole
      .from('messages')
      .select()
      .eq('id', user.id)
      .single();

    if (msg) {
      if (!msg.start_at || new Date(msg.start_at) < currStart) {
        console.info(`resetting daily_counter for user.id: ${user.id}`);
        console.info(`msg.start_at: ${msg.start_at} < currStart: ${currStart}`);

        msg.start_at = nowDate;
        msg.daily_counter = 0;
      }

      if (msg.daily_counter && msg.daily_counter > MAX_COUNT) {
        console.error(`daily limit exceeded for user.id: ${user.id}`);
        return new Response(
          JSON.stringify({
            error: `The number of messages reached the daily limit ${MAX_COUNT}.`,
          }),
          {
            status: 429,
          }
        );
      }
    }

    const { data: msg_new } = await supabaseClientServiceRole
      .from('messages')
      .upsert({
        id: user.id,
        counter: msg && msg.counter ? msg.counter + 1 : 1,
        daily_counter: msg && msg.daily_counter ? msg.daily_counter + 1 : 1,
        start_at: msg && msg.start_at ? msg.start_at : nowDate,
      })
      .select('counter')
      .single();

    if (msg_new && msg_new.counter && Number(msg_new.counter) % 100 === 0) {
      console.log(`new counter: ${msg_new.counter} (user.id: ${user.id})`);
    }

    if (
      msg_new &&
      msg_new.daily_counter &&
      Number(msg_new.daily_counter) % 100 === 0
    ) {
      console.log(
        `new daily_counter: ${msg_new.daily_counter} (user.id: ${user.id})`
      );
    }

    /***
     * Logic to call OpenAI api.
     */
    const { query, appType } = await req.json();
    const queryParsed = typeof query === 'string' ? JSON.parse(query) : query;
    //console.log(`appType: ${appType}`);

    const chatCompletion = await openai.chat.completions.create({
      messages: queryParsed,
      model: 'gpt-3.5-turbo',
      //model: 'gpt-4',
    });

    let msgs: [ChatCompletionMessage] = [queryParsed[queryParsed.length - 1]];
    //console.log(`req msg: `, queryParsed[queryParsed.length - 1]);
    //console.log(`resp msg: `, chatCompletion?.choices[0]?.message || '');
    if (chatCompletion?.choices[0]?.message) {
      msgs.push(chatCompletion?.choices[0]?.message);
    }
    saveMessages(supabaseClientServiceRole, msgs, user.id, appType);

    // Send the response back to the client
    return new Response(JSON.stringify(chatCompletion), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error: `, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
});

/* 
To invoke edge functions locally:

  1. Run `supabase start` (see: https://supabase.com/docs/guides/functions/unit-test)
  2. Run `supabase functions serve`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/openai' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data "{\"query\":[{\"role\":\"system\",\"content\":\"You are a mindful companion and assistant, here to listen and support your emotional needs.\"}]}"


To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/openai' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
