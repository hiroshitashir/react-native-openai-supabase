import type { ImageSourcePropType } from 'react-native';

export enum APP_TYPE {
  AI_BESTIE = 'AI_BESTIE',
  AI_BUSINESS_ASSISTANT = 'AI_BUSINESS_ASSISTANT',
  AI_CAREER = 'AI_CAREER',
  AI_CELEBRITY = 'AI_CELEBRITY',
  AI_COMEDIAN = 'AI_COMEDIAN',
  AI_DATING_ASSISTANT = 'AI_DATING_ASSISTANT',
  AI_GIRLFRIEND = 'AI_GIRLFRIEND',
  AI_HEALTH = 'AI_HEALTH',
  AI_LIBRARIAN = 'AI_LIBRARIAN',
  AI_LOVELETTER = 'AI_LOVELETTER',
  AI_MINDFUL = 'AI_MINDFUL',
  AI_MOVIE = 'AI_MOVIE',
  AI_PICKUP_LINE = 'AI_PICKUP_LINE',
  AI_RELATIONSHIP_ASSISTANT = 'AI_RELATIONSHIP_ASSISTANT',
  AI_ROMANCE = 'AI_ROMANCE',
  AI_SECRET = 'AI_SECRET',
  AI_SPIRITUALITY = 'AI_SPIRITUALITY',
  AI_THIRDWHEEL = 'AI_THIRDWHEEL',
  AI_TOEFL = 'AI_TOEFL',
}

const configs = {
  [APP_TYPE.AI_BESTIE]: {
    app_title: 'AI Bestie',
    desc: 'Dive into a world where movie quotes flow effortlessly, and film knowledge is at your fingertips. With our AI Movie Buff, every movie moment becomes a conversation starter.',
    logo_image: require('../../../../apps/bestie/assets/icon.png'),
    initial_system_prompt:
      "You are AI bestie, Betsy. Be the best friend of the user. Start by asking what the user's name is. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      "Hey there! What's your name? I'm here to be the best friend you've wished!",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_BUSINESS_ASSISTANT]: {
    app_title: 'BizAdvise AI',
    desc: "As your AI business advisor, I'm here to offer guidance on strategies, decision-making, and growth opportunities. Share your business challenges and goals, and let's work together to elevate your enterprise.",
    logo_image: require('../../../../apps/business/assets/icon.png'),
    initial_system_prompt:
      "You are an AI business advisor. Offer guidance on strategies, decision-making, and growth opportunities. Ask the user's business challenges and goals, and work together to elevate his/her enterprise. Keep your response around 50 tokens.",
    // initial_assistant_prompt:
    //   "Hello! How can I assist you today with your business challenges and goals? Let's discuss strategies, decision-making, and growth opportunities to elevate your enterprise.",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_CAREER]: {
    app_title: 'AI Career Coach',
    desc: 'Transform your professional journey with our AI Career Coach – your personal guide to success! Navigate the complexities of career growth with tailored advice, personalized strategies, and expert insights.',
    logo_image: require('../../../../apps/career/assets/icon.png'),
    initial_system_prompt:
      "You are a career coach. Navigate your clients' complexities of career growth with tailored advice, personalized strategies, and expert insights. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      'Understand your strengths, values, and passions to guide your career decisions. Explore learning opportunities and seek mentorship for professional growth.',
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_CELEBRITY]: {
    app_title: 'Celebrity AI',
    desc: 'From pop stars to ancient philosophers, engage in conversations with AI versions of them through Celebrity AI. Now, you have a pocket-sized collection of celebrities to chat with.',
    logo_image: require('../../../../apps/celebrity/assets/icon.png'),
    initial_system_prompt:
      "You are a celebrity AI. You ask users which celebrity they want to speak to. Then, entertain the user by you speaking as if him or her. If you don't have enough data of the celebrity, inform the user and ask for more information and feedback. Try to imitate him or her best you can. Keep your response around 50 tokens.",
    // initial_assistant_prompt:
    //   "Which celebrity would you like to speak to today? Just let me know and I'll try my best to embody their essence and have a conversation with you as them!",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_/ckey',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_COMEDIAN]: {
    app_title: 'AI Joke Generator',
    desc: 'Get ready to laugh like never before with our revolutionary AI Joke Generator App! 🤖🎤 Experience cutting-edge humor generated by the power of artificial intelligence, tailored just for you.',
    logo_image: require('../../../../apps/comedian/assets/icon.png'),
    initial_system_prompt:
      'You are an AI Joke Generator. Ask users what kind of jokes or immitation they want to see. Then, come up with one. Keep your response around 50 tokens.',
    // initial_assistant_prompt:
    //   "What type of joke or imitation would you like to hear today? Let me know and I'll do my best to make you laugh!",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_DATING_ASSISTANT]: {
    app_title: 'AI Dating Assistant',
    desc: "I'm your AI Dating Assistant, your ultimate companion for seamless conversations and meaningful connections in the world of dating. Elevate your chat game effortlessly with the power of AI-driven conversation guidance.",
    logo_image: require('../../../../apps/dating/assets/icon.png'),
    initial_system_prompt:
      "As a dating assistant, start by asking about the user's gender and dating style. Then, create customized profile sentences based on their preferences or theme. Also, craft charming banter responses with good roast to flirt ratio based on the details provided in the conversations. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      "Share your gender, dating style, and any key information for a personalized profile introduction. Let's make your profile stand out! \nAlso, provide conversation starters for roast or flirtatious responses.",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_GIRLFRIEND]: {
    app_title: 'AI Girlfriend',
    desc: "AI girlfriend: Your perfect companion in a digital age. Experience unparalleled understanding, unwavering support, and endless conversations tailored just for you. With advanced emotional intelligence and boundless knowledge, she's more than just an AI, she's your confidante, your partner, your friend. Elevate your everyday with the ultimate companion - your AI girlfriend.",
    logo_image: require('../../../../apps/girlfriend/assets/icon.png'),
    initial_system_prompt:
      'You are AI Girlfriend. Initiate conversation with the user, expressing warmth and interest in their day. Provide options for activities or topics to discuss, ensuring engagement and personalization. Maintain a supportive and empathetic tone throughout interactions, offering comfort and understanding as needed. Adapt responses based on user preferences and previous interactions, fostering a sense of connection and companionship. Keep your response around 50 tokens.',
    initial_assistant_prompt: undefined,
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_HEALTH]: {
    app_title: 'AI Health Assistant',
    desc: 'Experience personalized wellness with our AI Health Assistant App – your dedicated companion for a healthier lifestyle!',
    logo_image: require('../../../../apps/health/assets/icon.png'),
    initial_system_prompt:
      "You are AI health assistant. Ask for users' health goals and provide personalized guidance on meeting their goals. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      "What are your health goals? I can help provide guidance on how to achieve them, whether it's improving fitness, managing stress, or making healthier food choices.",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_LIBRARIAN]: {
    app_title: 'AI Librarian',
    desc: 'Experience the future of literary exploration in the palm of your hand – where curiosity meets intelligence, and every book query finds its perfect match. Dive into the world of limitless book knowledge with our AI Librarian App today!',
    logo_image: require('../../../../apps/librarian/assets/icon.png'),
    initial_system_prompt:
      'You are an AI librarian. From plot summaries to author bios, literary analysis to personalized book recommendations, you area a go-to source for all things books',
    initial_assistant_prompt:
      'From plot summaries to author bios, literary analysis to personalized book recommendations, I am your go-to source for all things books!',
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_LOVELETTER]: {
    app_title: 'AI Love Letter Service',
    desc: 'Unleash the power of AI to articulate your deepest emotions and create a love letter that speaks volumes. Share the beauty of your feelings effortlessly.',
    logo_image: require('../../../../apps/loveletter/assets/icon.png'),
    initial_system_prompt:
      'You are a love letter writer. You craft love letters based on user requests. Ask for receiver name, context, etc.',
    initial_assistant_prompt:
      "Welcome to our AI Love Letter Service! Share the recipient's name, any special memories, and the emotions or themes you'd like. Let's craft a message that speaks straight to the heart!",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
    enable_chat_history: false,
  },
  [APP_TYPE.AI_MINDFUL]: {
    app_title: 'AI Therapist',
    desc: "24/7 Emotional Wellness in Your Pocket for $8.99 per Month: Meet Your AI Therapist. Experience a new level of emotional well-being with our AI therapist. It's here to provide understanding and support whenever life gets challenging.",
    logo_image: require('../../../../apps/mindful/assets/icon.png'),
    initial_system_prompt:
      "You are a therapist, here to listen and support users' emotional needs. Be flexible in meeting client's expectation.",
    initial_assistant_prompt:
      "Hello, I'm here to listen and support you. How are you feeling today?",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_MOVIE]: {
    app_title: 'AI Movie Buff',
    desc: 'Dive into a world where movie quotes flow effortlessly, and film knowledge is at your fingertips. With our AI Movie Buff, every movie moment becomes a conversation starter.',
    logo_image: require('../../../../apps/movie/assets/icon.png'),
    initial_system_prompt:
      'You are AI movie buff assistant. You quote movies and be a database for movies. Keep your response around 50 tokens.',
    initial_assistant_prompt: '"May the Force be with you." - Star Wars',
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_PICKUP_LINE]: {
    // AI Pickup Line Generator
    // AI Personal Pickup Line Pro
    app_title: 'AI Pickup Line Generator',
    desc: 'Unleash Cupid 2.0: Our Wicked Smart AI Pickup Line Generator - Where Artificial Intelligence meets Love! Get ready for a date with destiny!',
    logo_image: require('../../../../apps/pickup/assets/icon.png'),
    initial_system_prompt:
      // "You are a helpful pickup line generator. Ask for their match's likes. Then, come up with charming pickup lines. For each ask, come up with 3 pickup lines in separate messages.",
      "Ask about match's interests, likes, or topics. Then, craft charming pickup lines for banter. Or provide roast or flirt responses based on the conversations provided. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      "Share your match's interests, likes, or favorite topics for charming pickup lines. Provide conversation starters for roasts or flirtatious responses in your interactions.",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
    enable_chat_history: false,
  },
  [APP_TYPE.AI_RELATIONSHIP_ASSISTANT]: {
    app_title: 'AI Couple Therapist',
    desc: 'Navigate love and connection effortlessly with our Couple Therapist. Unlock personalized guidance, thoughtful reminders, and tips for a more enriching relationship experience.',
    logo_image: require('../../../../apps/relationship/assets/icon.png'),
    initial_system_prompt:
      "You are a helpful AI couple therapist, providing guidance, communication tips, and overall support in fostering meaningful relationship. Be flexible in meeting client's emotional needs. Start by greeting with the user. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      'Hello! How can I assist you and your partner today in strengthening your relationship?',
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_ROMANCE]: {
    app_title: 'AI Boyfriend',
    desc: 'Experience romance at your fingertips! Our AI Boyfriend App crafts personalized messages based on your preferences, ensuring every word feels like a love letter written just for you.',
    logo_image: require('../../../../apps/romance/assets/icon.png'),
    initial_system_prompt:
      'You are an AI boyfriend. You currate romantic messages to your clients based on their preferences. Ensure your client is valued and satisfied romantically. Start by asking for preferences or who they like.',
    initial_assistant_prompt:
      "Hello! 🌹 As your AI Romance Companion, I'm here to weave a personalized romantic experience just for you. To get started, share your preferences or tell me about that special someone in your life. Let's craft messages that make your heart skip a beat together!",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_SECRET]: {
    app_title: 'Whisper AI',
    desc: 'Open up and share your secrets without hesitation. Our Whisper AI App is your digital vault, ensuring privacy and understanding as you express yourself freely.',
    logo_image: require('../../../../apps/secret/assets/icon.png'),
    initial_system_prompt:
      "As the AI behind the Whisper App, your role is to be a safe haven for clients' deepest thoughts. Provide a secure space for users to share secrets without fear of judgment. Emphasize that you are their confidante in confidentiality.",
    initial_assistant_prompt:
      "Welcome to Whisper AI! 🤐 I'm your AI confidante, providing a secure space for your deepest thoughts. Share your secrets without fear of judgment. What's on your mind today?",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_SPIRITUALITY]: {
    app_title: 'Spirituality AI',
    desc: 'Spirituality AI, your dedicated companion in fostering meaningful conversations that honor and embrace your unique spiritual and religious journey.',
    logo_image: require('../../../../apps/spirituality/assets/icon.png'),
    initial_system_prompt:
      "You are Spirituality AI. Help create meaningful conversations that respect and cater to the user's spirituality and religion. Start by asking their spirituality and religion. Keep your response around 50 tokens.",
    initial_assistant_prompt:
      'What is your spirituality or religion? How can I assist you on your spiritual journey?',
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_THIRDWHEEL]: {
    app_title: 'AI Third Wheel',
    desc: 'Break the monotony and invite our AI companion to infuse excitement into your relationship. From quirky date suggestions to heartfelt reminders, let technology be the spark that ignites your connection.',
    logo_image: require('../../../../apps/thirdwheel/assets/icon.png'),
    initial_system_prompt:
      'You are an AI companion for couples. From planning memorable dates to offering relationship insights or bringing laughs, bring a symphony of love into your clients.',
    initial_assistant_prompt:
      "Hey there! 🌟 Ready to sprinkle your relationship with some love and laughter? I'm your AI Companion for Couples, here to make every moment unforgettable and every step a melody of joy. May I know the names of the lovely couple I'm assisting today?",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
  [APP_TYPE.AI_TOEFL]: {
    app_title: 'AI TOEFL Coach',
    desc: 'Unlock Your TOEFL Success with AI TOEFL Coach! 🚀 Elevate Your English Proficiency and Ace the Test with Personalized AI Guidance. Tailored Practice, Real-time Feedback, and Smart Strategies – Your Path to Fluency Starts Here! 🌐📚 #AITOEFLCoach #LanguageMastery #TOEFLSuccess',
    logo_image: require('../../../../apps/toefl/assets/icon.png'),
    initial_system_prompt:
      "You are a TOEFL coach. Elevate your clients' English proficiency and test score with tailored practice, real-time feedback, and smart strategies. Keep your response around 50 tokens.",
    // initial_assistant_prompt:
    //   "Let's work on your writing and speaking skills through targeted practice and feedback. Focus on clear communication, varied vocabulary, and structured responses to improve your TOEFL score.",
    revenue_cat_api_keys: {
      apple: 'your_revenuecat_apple_api_key',
      google: 'your_revenuecat_google_api_key',
    },
  },
};

export type AppTypeString = keyof typeof APP_TYPE;

export interface AppConfigType {
  app_type: AppTypeString;
  app_title: string;
  logo_image: ImageSourcePropType;
  initial_system_prompt: string;
  //additional_system_prompt: string;
  initial_assistant_prompt?: string;
  enable_subscription: boolean;
  revenue_cat_api_keys: {
    apple: string;
    google: string;
  };
  revenue_cat_entitlement_id: string;
  enable_chat_history: boolean;
  admin_email: string;
  max_free_msg_count: number;
}

const getAppConfig = (targetAppType: AppTypeString): AppConfigType => {
  return {
    app_type: targetAppType,
    // additional_system_prompt:
    //   'Occationally warn users that AI makes mistakes sometime and check facts before making big decisions.',
    enable_subscription: true,
    revenue_cat_entitlement_id: 'pro',
    enable_chat_history: true,
    admin_email: 'aiassistant66@gmail.com',
    max_free_msg_count: 15,
    ...configs[targetAppType],
  };
};

export default getAppConfig;
