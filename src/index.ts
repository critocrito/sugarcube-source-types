import * as twitter from "./twitter";
import * as youtube from "./youtube";

type SourceType =
  | "youtube_video"
  | "youtube_channel"
  | "twitter_tweet"
  | "twitter_user";

export const sourceType = (
  source: string | null | undefined,
): SourceType | undefined => {
  switch (true) {
    case youtube.isYoutubeVideo(source):
      return "youtube_video";

    case youtube.isYoutubeChannel(source):
      return "youtube_channel";

    case twitter.isTwitterTweet(source):
      return "twitter_tweet";

    case twitter.isTwitterFeed(source):
      return "twitter_user";

    default:
      // throw new Error(`Source type of ${source} could not be determined.`);
      return undefined;
  }
};

export * from "./youtube";
export * from "./twitter";
