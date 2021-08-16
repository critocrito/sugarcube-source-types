import test from "ava";
import {every} from "lodash/fp";

import {
  isYoutubeChannel,
  isYoutubeVideo,
  normalizeYoutubeChannelUrl,
  normalizeYoutubeVideoUrl,
  parseYoutubeChannel,
  parseYoutubeVideo,
} from "../src";
import {
  notYoutubeVideos,
  youtubeChannels,
  youtubeVideos,
} from "./helpers/fixtures";

test("can parse the video id from a video id", (t) => {
  const videoId = "gui_SE8rJUM";

  const expected = videoId;
  const result = parseYoutubeVideo(videoId);

  t.is(result, expected);
});

test("can parse the video id from a video url", (t) => {
  const videoUrl = "https://www.youtube.com/watch?v=gui_SE8rJUM";

  const expected = "gui_SE8rJUM";
  const result = parseYoutubeVideo(videoUrl);

  t.is(result, expected);
});

test("can parse the video id from an embedded video url", (t) => {
  const videoUrl = "https://www.youtube.com/embed/gui_SE8rJUM?version";
  const videoId = "gui_SE8rJUM";

  const expected = videoId;
  const result = parseYoutubeVideo(videoUrl);

  t.is(result, expected);
});

test("can parse the channel id from a channel id", (t) => {
  const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

  const expected = channelId;
  const result = parseYoutubeChannel(channelId);

  t.is(result, expected);
});

test("can parse the channel id from a channel url", (t) => {
  const channelUrl = "https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw";
  const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

  const expected = channelId;
  const result = parseYoutubeChannel(channelUrl);

  t.is(result, expected);
});

["featured", "videos", "playlists", "community", "channels", "about"].forEach(
  (segment) =>
    test(`can parse the channel id from a channel url with the '${segment}' path segment`, (t) => {
      const channelUrl = `https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw/${segment}`;
      const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

      const expected = channelId;
      const result = parseYoutubeChannel(channelUrl);

      t.is(result, expected);
    }),
);

test("can parse video urls", (t) => {
  const result = every(isYoutubeVideo, youtubeVideos);

  t.true(result);
});

test("fails similar video urls", (t) => {
  const result = every(isYoutubeVideo, notYoutubeVideos);

  t.false(result);
});

test("fails channel urls", (t) => {
  const result = every(isYoutubeVideo, youtubeChannels);

  t.false(result);
});

test("can parse channel urls", (t) => {
  const result = every(isYoutubeChannel, youtubeChannels);

  t.true(result);
});

test("fails to parse video urls", (t) => {
  const result = every(isYoutubeChannel, [
    ...youtubeVideos,
    ...notYoutubeVideos,
  ]);

  t.false(result);
});

test("returns false on undefined video", (t) => {
  // eslint-disable-next-line unicorn/no-null
  t.false(every(isYoutubeVideo, [undefined, null]));
});

test("returns false on undefined channel", (t) => {
  // eslint-disable-next-line unicorn/no-null
  t.false(every(isYoutubeChannel, [undefined, null]));
});

test("can normalize video urls", (t) => {
  const urls = [
    "https://www.youtube.com/watch?v=tcCBtSjKEzI",
    "http://youtu.be/tcCBtSjKEzI",
    "tcCBtSjKEzI",
  ];
  const expected = "https://www.youtube.com/watch?v=tcCBtSjKEzI";

  const result = every((u) => normalizeYoutubeVideoUrl(u) === expected, urls);

  t.true(result);
});

test("can normalize channel urls", (t) => {
  const urls = [
    "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A",
    "UCegnDJbvrOhvbLU3IzeIV8A",
  ];

  const expected = "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A";

  const result = every((u) => normalizeYoutubeChannelUrl(u) === expected, urls);

  t.true(result);
});

test("fail to normalize invalid channel inputs", (t) => {
  // eslint-disable-next-line unicorn/no-null
  const invalidUrls = ["gibberish", undefined, null];

  const result = every(
    (u) => normalizeYoutubeChannelUrl(u) === undefined,
    invalidUrls,
  );

  t.true(result);
});

test("fail to normalize invalid video inputs", (t) => {
  // eslint-disable-next-line unicorn/no-null
  const invalidUrls = ["gibberish", undefined, null];

  const result = every(
    (u) => normalizeYoutubeVideoUrl(u) === undefined,
    invalidUrls,
  );

  t.true(result);
});

["", "about:blank", "about:newtab", "about:config"].forEach((term) => {
  test(`ignore false positives: ${
    term === "" ? "empty string" : term
  }`, (t) => {
    t.false(isYoutubeVideo(term));
    t.false(isYoutubeChannel(term));
  });
});
