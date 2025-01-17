import { BASE_URL } from '@/shared/constants';

export const LEARNER_API_ROUTES = {
  GET_ALL_LEARNERS: `${BASE_URL}/<example>`,

  GET_ALL_LANGUAGE: `${BASE_URL}/language-pairs/source-languages`,
  GET_LANGUAGE_PAIR: `${BASE_URL}/language-pairs/source-language-locale`,

  GET_ALL_HELEN_SPEAKING: `${BASE_URL}/videos/get-all`,
  HELEN_SPEAKING: `${BASE_URL}/videos`,

  GET_ALL_HELEN_SPEAKING_CATEGORY: `${BASE_URL}/videos/category/get-all`,
  HELEN_SPEAKING_CATEGORY: `${BASE_URL}/videos/category`,

  GET_ALL_HELEN_SPEAKING_TAG: `${BASE_URL}/videos/tag/get-all`,
  HELEN_SPEAKING_TAG: `${BASE_URL}/videos/tag`,

  GET_ALL_HELEN_SPEAKING_CHANNEL: `${BASE_URL}/videos/channels`,
  GET_ALL_HELEN_SPEAKING_CHANNEL_VIDEO: `${BASE_URL}/videos/get-all-for-learners`,

  GET_ALL_SUPPORT_LANGUAGES: `${BASE_URL}/rabito-ai/supported-languages`,
  //LOGIN
  REFRESH_TOKEN: `${BASE_URL}/users/refresh-token`,

  // HOME PAGE
  GET_ALLAUDIO_TOPICS: `${BASE_URL}/audio/topics`,
  GET_VIDEO_LEARNERS: `${BASE_URL}/videos/learners`,
  GET_VIDEO_RECOMMENT_LEARNERS: `${BASE_URL}/videos/trending`,
  GET_VIDEO_LERNERS_CONTINUE: `${BASE_URL}/videos/history-activities`,

  GET_VIDEO_CHANNELS: `${BASE_URL}/videos/channel`,

  GET_POPULAR_AUDIOS: `${BASE_URL}/audio/learners`,
  GET_STREAK: `${BASE_URL}/streak`,

  // VIDEO DETAIL PAGE
  GET_ALL_SUBTITLE_OF_VIDEO: `${BASE_URL}/youtube-subtitles/get-all-by-media-url`,
  GET_LIST_VIDEO_WORDS: `${BASE_URL}/videos/words`,
  GET_VIDEO_CATEGORIES: `${BASE_URL}/videos/categories`,
  GET_VIDEO_TRENDING: `${BASE_URL}/videos/trending`,
  GET_TOP_CHANNEL: `${BASE_URL}/videos/top-channel`,
  GET_TRANSLATED_WORDS: `${BASE_URL}/rabito-ai/translate`,
  GET_VIDEO_QUIZ: `${BASE_URL}/video-quiz`,

  PUT_WORD_PROFICIENCY_LEVEL: `${BASE_URL}/word/word-proficiency-level`,

  // PRICING
  GET_PACKAGE_PLANS: `${BASE_URL}/payment/get-package-plans`,
  INITIATE_SUBSCRIPTION: `${BASE_URL}/payment/initiate-subscription`,
  GET_SUBSCRIPTION: `${BASE_URL}/payment/get-subscription`,
  CREATE_AFFILIATE_SUBSCRIPTION: `${BASE_URL}/payment/create-affiliate-subscription`,
};
