import test from "ava";
import {every, flow, isEqual} from "lodash/fp";

import {sourceType} from "../src";
import {
  httpUrls,
  notTelegramChannels,
  notYoutubeVideos,
  telegramChannels,
  twitterFeeds,
  twitterTweets,
  youtubeChannels,
  youtubeVideos,
} from "./helpers/fixtures";

test("can determine Youtube video urls", (t) => {
  const matchYoutubeVideo = flow([sourceType, isEqual("youtube_video")]);

  t.true(every(matchYoutubeVideo, youtubeVideos));
});

test("no false positives for Youtube video urls", (t) => {
  const matchNotYoutubeVideo = flow([
    sourceType,
    (v): boolean => !isEqual("youtube_video", v),
  ]);

  t.true(every(matchNotYoutubeVideo, notYoutubeVideos));
});

test("can determine Youtube channel urls", (t) => {
  const matchYoutubeChannel = flow([sourceType, isEqual("youtube_channel")]);

  t.true(every(matchYoutubeChannel, youtubeChannels));
});

test("can determine Twitter tweet urls", (t) => {
  const matchTwitterTweet = flow([sourceType, isEqual("twitter_tweet")]);

  t.true(every(matchTwitterTweet, twitterTweets));
});

test("can determine Twitter feed urls", (t) => {
  const matchTwitterFeed = flow([sourceType, isEqual("twitter_user")]);

  t.true(every(matchTwitterFeed, twitterFeeds));
});

test("ignore undefined values", (t) => {
  const matchUrl = flow([sourceType, isEqual(undefined)]);

  // eslint-disable-next-line unicorn/no-null
  t.true(every(matchUrl, [undefined, null]));
});

test("can determine HTTP urls", (t) => {
  const matchHttpUrl = flow([sourceType, isEqual("http_url")]);

  t.true(every(matchHttpUrl, httpUrls));
});

test("can determine Telegram channels", (t) => {
  const matchTelegramChannel = flow([sourceType, isEqual("telegram_channel")]);

  t.true(every(matchTelegramChannel, telegramChannels));
});

test("no false positives for Telegram channel urls", (t) => {
  const matchNotTelegramChannel = flow([
    sourceType,
    (v): boolean => !isEqual("telegram_channel", v),
  ]);

  t.true(every(matchNotTelegramChannel, notTelegramChannels));
});
