import test from "ava";
import {every, flow, isEqual} from "lodash/fp";

import {sourceType} from "../src";
import {
  notTwitterTweetUrls,
  notYoutubeVideoUrls,
  twitterFeedUrls,
  twitterTweetUrls,
  youtubeChannelUrls,
  youtubeVideoUrls,
} from "./helpers/fixtures";

test("can determine Youtube video urls", (t) => {
  const matchYoutubeVideo = flow([sourceType, isEqual("youtube_video")]);

  t.true(every(matchYoutubeVideo, youtubeVideoUrls));
});

test("can determine Youtube channel urls", (t) => {
  const matchYoutubeChannel = flow([sourceType, isEqual("youtube_channel")]);

  t.true(every(matchYoutubeChannel, youtubeChannelUrls));
});

test("can determine Twitter tweet urls", (t) => {
  const matchTwitterTweet = flow([sourceType, isEqual("twitter_tweet")]);

  t.true(every(matchTwitterTweet, twitterTweetUrls));
});

test("can determine Twitter feed urls", (t) => {
  const matchTwitterFeed = flow([sourceType, isEqual("twitter_user")]);

  t.true(every(matchTwitterFeed, twitterFeedUrls));
});

test("ignores invalid urls", (t) => {
  const matchUrl = flow([sourceType, isEqual(undefined)]);

  t.true(every(matchUrl, notYoutubeVideoUrls.concat(notTwitterTweetUrls)));
});

test("ignore undefined values", (t) => {
  const matchUrl = flow([sourceType, isEqual(undefined)]);

  // eslint-disable-next-line unicorn/no-null
  t.true(every(matchUrl, [undefined, null]));
});
