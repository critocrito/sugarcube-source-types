import * as http from "./http";
import * as telegram from "./telegram";
import * as twitter from "./twitter";
import * as youtube from "./youtube";

type SourceType =
  | "http_url"
  | "telegram_channel"
  | "twitter_tweet"
  | "twitter_user"
  | "youtube_video"
  | "youtube_channel";

export const sourceType = (term?: string | null): SourceType | undefined => {
  switch (true) {
    case youtube.isYoutubeChannel(term):
      return "youtube_channel";

    case youtube.isYoutubeVideo(term):
      return "youtube_video";

    case twitter.isTwitterTweet(term):
      return "twitter_tweet";

    case twitter.isTwitterFeed(term):
      return "twitter_user";

    case telegram.isTelegramChannel(term):
      return "telegram_channel";

    case http.isHttpUrl(term):
      return "http_url";

    default:
      return undefined;
  }
};

export * from "./http";
export * from "./telegram";
export * from "./twitter";
export * from "./youtube";
