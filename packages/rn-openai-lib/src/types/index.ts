import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class ChatGptError extends Error {
  statusCode?: number;
  originalError?: Error;
}

export interface StreamMessageParams {
  messages: Array<ChatCompletionMessageParam>;
  onAccumulatedResponse: (arg: CreateChatCompleteResponse) => void;
  onError?: (arg: ChatGptError) => void;
  appType?: string;
}

export interface CreateChatCompleteParams {
  messages: Array<ChatCompletionMessageParam>;
  appType?: string;
}

export interface CreateChatCompleteResponse {
  message: string;
  isDone?: boolean;
}

interface Choice {
  /**
   * The reason the model stopped generating tokens. This will be `stop` if the model
   * hit a natural stop point or a provided stop sequence, `length` if the maximum
   * number of tokens specified in the request was reached, `content_filter` if
   * content was omitted due to a flag from our content filters, `tool_calls` if the
   * model called a tool, or `function_call` (deprecated) if the model called a
   * function.
   */
  finish_reason:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'function_call';

  /**
   * The index of the choice in the list of choices.
   */
  index: number;

  text: string;
  message: {
    content: string;
    role: string;
  };
}

export interface ChatCompletion {
  choices: Array<Choice>;
}

export type WebViewEvents =
  | {
      type: 'REQUEST_INTERCEPTED_CONFIG';
      payload: RequestInit;
    }
  | {
      type: 'RAW_ACCUMULATED_RESPONSE';
      payload: string;
    }
  | {
      type: 'STREAM_ERROR';
      payload: {
        status: number;
        statusText: string;
      };
    }
  | { type: 'CHAT_GPT_FULL_CAPACITY'; payload: null };
