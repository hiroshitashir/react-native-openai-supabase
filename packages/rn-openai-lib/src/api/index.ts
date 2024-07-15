import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';

import type {
  CreateChatCompleteResponse,
  CreateChatCompleteParams,
  ChatCompletion,
} from '../types';
import { supabase } from '../../lib/supabase';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import type { StreamMessageParams } from '../types';
import { ChatGptError } from '../types';

export async function sendMessage(
  messages: Array<ChatCompletionMessageParam>,
  appType: string
): Promise<CreateChatCompleteResponse>;
export async function sendMessage(
  args: StreamMessageParams,
  appType: string
): Promise<CreateChatCompleteResponse>;
export async function sendMessage(
  arg0: StreamMessageParams | Array<ChatCompletionMessageParam>,
  appType: string
) {
  let messages, onAccumulatedResponse, onError;
  if (arg0 instanceof Array) {
    messages = arg0;
  } else {
    ({ messages, onAccumulatedResponse, onError } = arg0);

    if (!onAccumulatedResponse) {
      throw new ChatGptError(
        'onAccumulatedResponse is required for stream based responses.'
      );
    }
  }

  let chatGptResponse;
  try {
    chatGptResponse = await createChatComplete({ messages, appType });
  } catch (err) {
    if (onError) {
      if (err instanceof ChatGptError || err instanceof Error) {
        onError(err);
      } else if (err instanceof String) {
        onError(new Error(err as string));
      }
    }
  }

  if (onAccumulatedResponse && chatGptResponse) {
    onAccumulatedResponse(chatGptResponse);
  }
  return chatGptResponse;
}

/**
 * Send a chat.completions.create API request to OpenAI.
 *
 * @param CreateChatCompleteParams
 *  An example of CreateChatCompleteParams:
 *  CreateChatCompleteParams:
 *   {
 *    messages: [
 *     { role: 'system',
 *       content: 'Respond to user input kindly.' },
 *     { role: 'user',
 *       content: message }
 *    ]
 *   }
 * @returns CreateChatCompleteResponse
 */
export async function createChatComplete({
  messages,
  appType,
}: CreateChatCompleteParams): Promise<CreateChatCompleteResponse> {
  const { data, error } = await supabase.functions.invoke<ChatCompletion>(
    'openai',
    {
      body: { query: JSON.stringify(messages), appType: appType },
    }
  );

  if (error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw Error(errorMessage.error);
  } else if (error instanceof FunctionsRelayError) {
    console.warn('Relay error:', error.message);
  } else if (error instanceof FunctionsFetchError) {
    console.warn('Fetch error:', error.message);
  }

  if (error) {
    throw error;
  }
  return {
    message: data?.choices[0]?.message?.content || '',
    isDone: true,
  };
}
