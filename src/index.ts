import * as twitter from "./twitter";
import * as youtube from "./youtube";

type SourceType =
  | "youtube_video"
  | "youtube_channel"
  | "twitter_tweet"
  | "twitter_user";

export const sourceType = (term?: string): SourceType | undefined => {
  switch (true) {
    case youtube.isYoutubeVideo(term):
      return "youtube_video";

    case youtube.isYoutubeChannel(term):
      return "youtube_channel";

    case twitter.isTwitterTweet(term):
      return "twitter_tweet";

    case twitter.isTwitterFeed(term):
      return "twitter_user";

    default:
      return undefined;
  }
};

export * from "./youtube";
export * from "./twitter";
