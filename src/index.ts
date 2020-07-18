import * as http from "./http";
import * as twitter from "./twitter";
import * as youtube from "./youtube";

type SourceType =
  | "youtube_video"
  | "youtube_channel"
  | "twitter_tweet"
  | "twitter_user"
  | "http_url";

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

    case http.isHttpUrl(term):
      return "http_url";

    default:
      return undefined;
  }
};

export * from "./youtube";
export * from "./twitter";
export * from "./http";
