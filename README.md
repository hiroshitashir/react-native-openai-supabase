# react-native-openai-supabase

## Create Your AI Chat Mobile App in 1 day
This repo is a fork from [react-native-openai](https://github.com/candlefinance/react-native-openai). Several changes are made to the original repo below.

- API calls to openai were directly called from react-native app in the original repo, which forced the app to include openai API key and it was unsecure. This forked version calls supabase edge function instead and it forwards api calls to API endpoints at Openai.
- Login logic in UI was changed to call Supabase auth.

The app is only tested on Android Playstore.

## Sample App Demo
<center>
  <img src="https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/apps/comedian/ai-joke-demo.gif" width="280" height="560"/>
</center>

## Clone this repo

```$ git clone https://github.com/hiroshitashir/react-native-openai-supabase.git```

## Set up Supabase Edge Function
- Check [supabase docs](https://supabase.com/docs/guides/functions/quickstart) for setting up edge function at Supabase8
- The definition of the edge function can be found at [packages/rn-openai-lib/supabase/functions/openai](https://github.com/hiroshitashir/react-native-openai-supabase/tree/main/packages/rn-openai-lib/supabase/functions/openai).
- The edge function above uses Upstash's Redis for rate limiting api calls. Check [Upstash doc](https://upstash.com/docs/redis/overall/getstarted) for setting up.
- Under [packages/rn-openai-lib/supabase/functions/openai](https://github.com/hiroshitashir/react-native-openai-supabase/tree/main/packages/rn-openai-lib/supabase/functions/openai), you have to create .env file and it should contain four environment variables below.
  ```
  OPENAI_API_KEY=<Openai's api key>
  UPSTASH_REDIS_REST_URL="<Upstash's redit rest api url>"
  UPSTASH_REDIS_REST_TOKEN="<Upstash token for rest apis>"
  SUPABASE_SERVICE_KEY="<service key for supabase>"
  ```
- Inside [packages/rn-openai-lib/lib/supabase.ts](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/packages/rn-openai-lib/lib/supabase.ts), specify supabaseUrl and supabaseAnonKey. Check [doc](https://supabase.com/docs/reference/javascript/initializing) for details.
  ```
  const supabaseUrl = '<supabase project url>';
  const supabaseAnonKey = '<supabase key>';
  ```

- For configuring which edge function to call from this react native app, specifiy the edge function name inside createChatComplete method in [packages/rn-openai-lib/src/api/index.ts](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/packages/rn-openai-lib/src/api/index.ts) below.
  ```
  export async function createChatComplete({
    messages,
    appType,
  }: CreateChatCompleteParams): Promise<CreateChatCompleteResponse> {
    const { data, error } = await supabase.functions.invoke<ChatCompletion>(
      '<your supabase edge function name>',
      {
        body: { query: JSON.stringify(messages), appType: appType },
      }
    );
  ```

## Create App
- App examples can be found at [/apps](https://github.com/hiroshitashir/react-native-openai-supabase/tree/main/apps).

1. First, create entries in APP_TYPE and configs inside [packages/rn-openai-lib/src/app/config.ts](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/packages/rn-openai-lib/src/app/config.ts).
2. Then, copy a directory under [/apps](https://github.com/hiroshitashir/react-native-openai-supabase/tree/main/apps).
3. In [apps/<app name>/app/index.ts](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/apps/comedian/app/index.tsx), pass your APP_TYPE.<your app name> to configureApp.
4. In [apps/<app name>/app.config.js](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/apps/comedian/app.config.js), adjust string 'ai-your app name-assistant' and 'com.aiassistant.your app name'.

## Set Up RevenueCat
- The app uses RevenueCat for in-app purchase. Set up an account by following [doc](https://www.revenuecat.com/docs/welcome/projects).
- Get its API key by following [doc](https://www.revenuecat.com/docs/welcome/authentication).
- Follow [SDK Quickstart](https://www.revenuecat.com/docs/getting-started/quickstart) and set up store in Google Playstore.
- Inside [packages/rn-openai-lib/src/app/config.ts](https://github.com/hiroshitashir/react-native-openai-supabase/blob/main/packages/rn-openai-lib/src/app/config.ts), replaace `your_revenuecat_google_api_key` with your RevenueCat api key.

## Start App
- From `apps/<your app name>` directory, run yarn to install libraries.

  ```$ yarn```
- To start, run the expo command below. Check [doc](https://docs.expo.dev/tutorial/create-your-first-app/#run-the-app-on-mobile-and-web) for details.

  ```$ npx expo start```

## Build & Deploy App
- The app uses Expo's EAS. Check [doc](https://docs.expo.dev/build/introduction/) for more details. Build the app with the command below.

  ```eas build --profile production --platform android  --clear-cache```
- Submit your app by running the command below.

  ```eas submit --platform android```

- Follow [doc](https://docs.expo.dev/tutorial/eas/android-production-build/) for more details.

<!-- [![npm](https://img.shields.io/npm/v/react-native-openai?color=brightgreen)](https://www.npmjs.com/package/react-native-openai)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-native-openai)](https://bundlephobia.com/result?p=react-native-openai)
![platforms: ios, android, web](https://img.shields.io/badge/platform-ios%2C%20android-blue)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen)](https://github.com/hiroshitashir/react-native-openai/blob/master/LICENSE)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://snack.expo.dev/@hiroshitashir/react-native-openai) -->


## Disclaimer

This is not an official ChatGPT library. It's an effort to make it easier to integrate ChatGPT with React Native applications. As such, please treat it as experimental and use it with caution in production :wink:.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Credits
- The original repo [react-native-openai](https://github.com/candlefinance/react-native-openai).
- The unofficial [node.js client](https://github.com/transitive-bullshit/chatgpt-api), which served as inspiration.
- [OpenAI](https://openai.com) for creating [ChatGPT](https://openai.com/blog/chatgpt/) 🔥

## License

MIT

If you found this project interesting, please consider following me on [twitter](https://twitter.com/hiroshitashir)
