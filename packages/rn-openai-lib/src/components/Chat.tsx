import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GiftedChat, type IMessage } from 'react-native-gifted-chat2';
import { Button, Snackbar } from 'react-native-paper';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { Appbar } from 'react-native-paper';

//import { useChatGpt } from '../contexts/ChatGptContext';
import { useConfig } from '../contexts/ConfigContext';
//import appConfig from './config';
import { sendMessage } from '../api';
import { supabase } from '../../lib/supabase';
import LargeSecureStorage from '../../lib/LargeSecureStorage';
import { FunctionsRelayError, Session } from '@supabase/supabase-js';
import { APP_TYPE } from '../app/config';

const NUM_INITIAL_CHAT_HISTORY = 4;
const NUM_RECENT_CHAT_HISTORY = 4;

const KEY_INITIAL_CHAT_HISTORY = 'initialChatHistory';
const KEY_RECENT_CHAT_HISTORY = 'recentChatHistory';

const CHAT_GPT_ID = 'CHAT_GPT_ID';
const CHAT_SYSTEM_ID = 'CHAT_SYSTEM_ID';

const ROLE_USER = 'user';
const ROLE_ASSISTANT = 'assistant';
const ROLE_SYSTEM = 'system';

const ROLE2USER = {
  [ROLE_ASSISTANT]: {
    _id: CHAT_GPT_ID,
    name: 'react-native-openai',
  },
  [ROLE_SYSTEM]: {
    _id: CHAT_SYSTEM_ID,
  },
};

const storage = new LargeSecureStorage();

type TYPE_ROLE_ASSISTANT_SYSTEM = keyof typeof ROLE2USER;
const createBotMessage = (
  text: string,
  role: TYPE_ROLE_ASSISTANT_SYSTEM
): IMessage => {
  return {
    _id: String(Date.now()),
    text,
    createdAt: new Date(),
    user: ROLE2USER[role],
  };
};

const getRole = (msg: IMessage) => {
  switch (msg.user?._id) {
    case CHAT_GPT_ID:
      return ROLE_ASSISTANT;
    case CHAT_SYSTEM_ID:
      return ROLE_SYSTEM;
    default:
      return ROLE_USER;
  }
};

const changeIMessage2ChatCompletionMessageParam = (
  message: IMessage
): ChatCompletionMessageParam => {
  const getContent = (msg: IMessage) => {
    return msg.text;
  };

  return {
    role: getRole(message),
    content: getContent(message),
  };
};

const isMessageForGiftedChat = (message: IMessage): boolean => {
  const role = getRole(message);
  return role === ROLE_ASSISTANT || role === ROLE_USER;
};

interface ChatProps {
  incMsgCount: () => void;
  onGuestAction: () => void;
}

const Chat = ({ incMsgCount, onGuestAction }: ChatProps) => {
  const { config } = useConfig();
  //const { sendMessage } = useChatGpt();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  let textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    async function setupInitialChatHistory() {
      let msgs = [] as IMessage[];

      // await storage.removeItem(KEY_INITIAL_CHAT_HISTORY);
      // await storage.removeItem(KEY_RECENT_CHAT_HISTORY);

      let initialChatHistory = await storage.getItem(KEY_INITIAL_CHAT_HISTORY);
      let recentChatHistory = await storage.getItem(KEY_RECENT_CHAT_HISTORY);

      if (
        config.enable_chat_history &&
        (initialChatHistory || recentChatHistory)
      ) {
        if (recentChatHistory !== null) {
          recentChatHistory = JSON.parse(recentChatHistory);
          msgs = msgs.concat(recentChatHistory as unknown as IMessage[]);
        }

        if (initialChatHistory !== null) {
          initialChatHistory = JSON.parse(initialChatHistory);
          msgs = msgs.concat(initialChatHistory as unknown as IMessage[]);
        }
        msgs[msgs.length - 1] = createBotMessage(
          config.initial_system_prompt,
          ROLE_SYSTEM
        );
      } else {
        msgs = [
          createBotMessage(config.initial_system_prompt, ROLE_SYSTEM),
          //createBotMessage(config.additional_system_prompt, ROLE_SYSTEM),
        ];

        if (config.initial_assistant_prompt) {
          msgs = [
            createBotMessage(config.initial_assistant_prompt, ROLE_ASSISTANT),
            ...msgs,
          ];
        }
      }

      supabase.auth.getSession().then(({ data: { session: sessionParam } }) => {
        setSession(sessionParam);
      });

      supabase.auth.onAuthStateChange((_event, sessionParam) => {
        setSession(sessionParam);
      });

      setMessages(msgs);
    }

    setupInitialChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[0];
      if (!lastMessage || lastMessage.user._id === CHAT_GPT_ID) {
        return;
      }

      if (lastMessage.text.trim() === '/clear') {
        storage.removeItem(KEY_INITIAL_CHAT_HISTORY);
        storage.removeItem(KEY_RECENT_CHAT_HISTORY);

        // storage.setItem(KEY_INITIAL_CHAT_HISTORY, '');
        // storage.setItem(KEY_RECENT_CHAT_HISTORY, '');
        let newMsgs = [
          createBotMessage(config.initial_system_prompt, ROLE_SYSTEM),
        ];

        if (config.initial_assistant_prompt) {
          newMsgs = [
            createBotMessage(config.initial_assistant_prompt, ROLE_ASSISTANT),
            ...newMsgs,
          ];
        }
        setMessages(newMsgs);
        return;
      }

      setMessages((prevMessages) => [
        createBotMessage('...', ROLE_ASSISTANT),
        ...prevMessages,
      ]);
    }
  }, [config.initial_assistant_prompt, config.initial_system_prompt, messages]);

  useEffect(() => {
    async function storeChatHistory(newMessages: IMessage[]) {
      await storage.removeItem(KEY_INITIAL_CHAT_HISTORY);
      await storage.setItem(
        KEY_INITIAL_CHAT_HISTORY,
        JSON.stringify(newMessages.slice(-1 * NUM_INITIAL_CHAT_HISTORY))
      );
      if (newMessages.length > NUM_INITIAL_CHAT_HISTORY) {
        await storage.removeItem(KEY_RECENT_CHAT_HISTORY);
        await storage.setItem(
          KEY_RECENT_CHAT_HISTORY,
          JSON.stringify(
            newMessages.slice(
              0,
              Math.min(
                NUM_RECENT_CHAT_HISTORY,
                newMessages.length - NUM_INITIAL_CHAT_HISTORY
              )
            )
          )
        );
      }
    }

    const lastMessage = messages[0];
    if (
      lastMessage &&
      lastMessage.user._id === CHAT_GPT_ID &&
      lastMessage.text === '...'
    ) {
      let msgs = messages
        .map(changeIMessage2ChatCompletionMessageParam)
        .slice(1) // remove lastMessage with '...'
        .reverse();

      if (
        session?.user.email !== config.admin_email ||
        config.app_type === APP_TYPE.AI_TOEFL ||
        config.app_type === APP_TYPE.AI_BUSINESS_ASSISTANT ||
        config.app_type === APP_TYPE.AI_COMEDIAN
      ) {
        sendMessage(
          {
            messages: msgs,
            onAccumulatedResponse: (accumulatedResponse) => {
              // Attach to last message
              setMessages((previousMessages) => {
                const newMessages = [...previousMessages];
                // @ts-ignore
                newMessages[0] = {
                  ...previousMessages[0],
                  text: accumulatedResponse.message,
                };

                if (config.enable_chat_history) {
                  storeChatHistory(newMessages);
                }
                return newMessages;
              });
            },
            onError: (e) => {
              //setErrorMessage(`${e.statusCode} ${e.message}`);
              //console.error(`${e.statusCode} ${e.message}`);
              // Most likely token expired so sign out
              if (e instanceof FunctionsRelayError) {
                console.info(
                  `function relay error seen (token expired). signing out.`
                );
                signOut();
                return;
              }

              setMessages((previousMessages) => {
                const newMessages = [...previousMessages];
                // @ts-ignore
                newMessages[0] = {
                  ...previousMessages[0],
                  text: "Sorry, I couldn't process your request. " + e.message,
                };
                return newMessages;
              });
            },
          },
          config.app_type
        );
      } else {
        setMessages([
          { ...lastMessage, text: 'automated response' },
          ...messages.slice(1),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const onSend = useCallback(
    (msgs: IMessage[] = []) => {
      if (!session || !session.user) {
        onGuestAction();
        return;
      }
      incMsgCount();
      setMessages((previousMessages) => {
        return GiftedChat.append(previousMessages, msgs);
      });
    },
    [incMsgCount, onGuestAction, session]
  );

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(`Failed to sign out: `, error);
    } else {
      setSession(null);
    }
  };

  const renderAvatarFunc = () => {
    return (
      <>
        {/* <Image source={require('../../assets/message-avatar-icon.png')} /> */}
        <Image source={config.logo_image} style={styles.avatar} />
      </>
    );
  };

  const onInputTextChanged = () => {
    try {
      if ((!session || !session.user) && textInputRef?.current?.isFocused()) {
        //console.info(`calling onGuest`);
        onGuestAction();
      }
    } catch (err) {
      console.error(`err:`, err);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={config.app_title} />
        {session?.user && (
          <Button mode="contained" onPress={signOut}>
            Logout
          </Button>
        )}
      </Appbar.Header>
      <GiftedChat
        messages={messages.filter(isMessageForGiftedChat)}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        renderAvatar={renderAvatarFunc}
        onInputTextChanged={onInputTextChanged}
        textInputRef={textInputRef}
      />
      <Text style={styles.warning}>
        AI can make mistakes. Check important information.
      </Text>
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage('')}
        style={[
          styles.snackbar,
          { top: -Dimensions.get('window').height + insets.top + 32 },
        ]}
        duration={3000}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  warning: {
    borderColor: 'black',
    color: 'dimgray',
    fontSize: 11,
    paddingBottom: 5,
    margin: 5,
    textAlign: 'center',
  },
  snackbar: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default Chat;
