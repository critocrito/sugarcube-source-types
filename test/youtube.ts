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

const videoUrls = [
  "https://www.youtube.com/watch?v=tcCBtSjKEzI",
  "http://youtu.be/o0tjic523cg",
  "https://www.youtube.com/embed/iq_XLq5ONtE?version",
];

const notVideoUrls = [
  "https://www.youtube.com/results?search_query=sudan%27s+livestream+Massacre",
];

const channelUrls = [
  "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A",
];

test("youtube: can parse the video id from a video id", (t) => {
  const videoId = "gui_SE8rJUM";

  const expected = videoId;
  const result = parseYoutubeVideo(videoId);

  t.is(result, expected);
});

test("youtube: can parse the video id from a video url", (t) => {
  const videoUrl = "https://www.youtube.com/watch?v=gui_SE8rJUM";

  const expected = "gui_SE8rJUM";
  const result = parseYoutubeVideo(videoUrl);

  t.is(result, expected);
});

test("youtube: can parse the video id from an embedded video url", (t) => {
  const videoUrl = "https://www.youtube.com/embed/gui_SE8rJUM?version";
  const videoId = "gui_SE8rJUM";

  const expected = videoId;
  const result = parseYoutubeVideo(videoUrl);

  t.is(result, expected);
});

test("youtube: can parse the channel id from a channel id", (t) => {
  const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

  const expected = channelId;
  const result = parseYoutubeChannel(channelId);

  t.is(result, expected);
});

test("youtube: can parse the channel id from a channel url", (t) => {
  const channelUrl = "https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw";
  const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

  const expected = channelId;
  const result = parseYoutubeChannel(channelUrl);

  t.is(result, expected);
});

["featured", "videos", "playlists", "community", "channels", "about"].forEach(
  (segment) =>
    test(`youtube: can parse the channel id from a channel url with the '${segment}' path segment`, (t) => {
      const channelUrl = `https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw/${segment}`;
      const channelId = "UC_QIfHvN9auy2CoOdSfMWDw";

      const expected = channelId;
      const result = parseYoutubeChannel(channelUrl);

      t.is(result, expected);
    }),
);

test("youtube: can parse video urls", (t) => {
  const result = every(isYoutubeVideo, videoUrls);

  t.true(result);
});

test("youtube: fails similar video urls", (t) => {
  const result = every(isYoutubeVideo, notVideoUrls);

  t.false(result);
});

test("youtube: fails channel urls", (t) => {
  const result = every(isYoutubeVideo, channelUrls);

  t.false(result);
});

test("youtube: can normalize video urls", (t) => {
  const urls = [
    "https://www.youtube.com/watch?v=tcCBtSjKEzI",
    "http://youtu.be/tcCBtSjKEzI",
    "tcCBtSjKEzI",
  ];
  const expected = "https://www.youtube.com/watch?v=tcCBtSjKEzI";

  const result = every((u) => normalizeYoutubeVideoUrl(u) === expected, urls);

  t.true(result);
});

test("youtube: can parse channel urls", (t) => {
  const result = every(isYoutubeChannel, channelUrls);

  t.true(result);
});

test("youtube: fails to parse video urls", (t) => {
  const result = every(isYoutubeChannel, videoUrls.concat(notVideoUrls));

  t.false(result);
});

test("youtube: can normalize channel urls", (t) => {
  const urls = [
    "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A",
    "UCegnDJbvrOhvbLU3IzeIV8A",
  ];

  const expected = "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A";

  const result = every((u) => normalizeYoutubeChannelUrl(u) === expected, urls);

  t.true(result);
});
