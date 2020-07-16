import test from "ava";
import {every} from "lodash/fp";

import {
  isTwitterFeed,
  isTwitterTweet,
  normalizeTwitterTweetUrl,
  normalizeTwitterUserUrl,
  parseTweetId,
  parseTwitterUser,
} from "../src";

const tweetUrls = [
  "https://twitter.com/Ibrahim_waza/status/1073152537400934400",
  "https://twitter.com/LorianSynaro/status/1101881275558825985/photo/1",
  "https://mobile.twitter.com/kamalrahmtalla1/status/1150487367037440000?fbclid=IwAR2429sTkE",
  "https://twitter.com/i/status/1101499653441372160",
];

const notTweetUrls = [
  "https://tweetdeck.twitter.com/",
  "https://twitter.com/search?q=%23موكب14مارس&src=hash",
];

const feedUrls = ["https://twitter.com/WADHOSHA"];

test("twitter: can parse a regular id string", (t) => {
  const tweetId = "990930831148572672";
  const expected = tweetId;
  const result = parseTweetId(tweetId);
  t.is(result, expected);
});

test("twitter: can parse a full tweet URL", (t) => {
  const tweetId =
    "https://twitter.com/RFS_mediaoffice/status/990930831148572672";
  const expected = "990930831148572672";
  const result = parseTweetId(tweetId);
  t.is(result, expected);
});

test("twitter: can parse a direct photo URL as tweet id", (t) => {
  const tweetId =
    "https://twitter.com/LorianSynaro/status/1101881275558825985/photo/1";
  const expected = "1101881275558825985";
  const result = parseTweetId(tweetId);
  t.is(result, expected);
});

test("twitter: returns null when tweet id is undefined", (t) => {
  const tweetId = undefined;
  const result = parseTweetId(tweetId);
  t.is(result, undefined);
});

test("twitter: can parse a user name", (t) => {
  const userName = "my_user";
  const expected = userName;
  const result = parseTwitterUser(userName);
  t.is(result, expected);
});

test("twitter: can parse a user name with an @", (t) => {
  const userName = "@my_user";
  const expected = "my_user";
  const result = parseTwitterUser(userName);
  t.is(result, expected);
});

test("twitter: can parse a user id", (t) => {
  const userId = "3067493325";
  const expected = userId;
  const result = parseTwitterUser(userId);
  t.is(result, expected);
});

test("twitter: can parse a user id as integer", (t) => {
  const userId = 3067493325;
  const expected = userId.toString();
  const result = parseTwitterUser(userId);
  t.is(result, expected);
});

test("twitter: can parse a full url", (t) => {
  const userId = "https://twitter.com/my_user";
  const expected = "my_user";
  const result = parseTwitterUser(userId);
  t.is(result, expected);
});

test("twitter: can parse tweet urls", (t) => {
  const result = every(isTwitterTweet, tweetUrls);

  t.true(result);
});

test("twitter: fails similar tweet urls", (t) => {
  const result = every(isTwitterTweet, notTweetUrls);

  t.false(result);
});

test("twitter: fails feed urls", (t) => {
  const result = every(isTwitterTweet, feedUrls);

  t.false(result);
});

test("twitter: can normalize tweet urls", (t) => {
  const urls = [
    "https://twitter.com/Ibrahim_waza/status/1073152537400934400",
    "https://twitter.com/Ibrahim_waza/status/1073152537400934400/photo/1",
    "https://mobile.twitter.com/Ibrahim_waza/status/1073152537400934400?fbclid=IwAR2429sTkE",
  ];

  const expected =
    "https://twitter.com/Ibrahim_waza/status/1073152537400934400";

  const result = every((u) => normalizeTwitterTweetUrl(u) === expected, urls);

  t.true(result);
});

test("twitter: can normalize tweet ids", (t) => {
  const id = "1073152537400934400";

  const expected = "https://twitter.com/i/status/1073152537400934400";

  const result = normalizeTwitterTweetUrl(id);

  t.is(result, expected);
});

test("twitter: can parse feed urls", (t) => {
  const result = every(isTwitterFeed, feedUrls);

  t.true(result);
});

test("twitter: fails to parse feed urls", (t) => {
  const result = every(isTwitterFeed, tweetUrls.concat(notTweetUrls));

  t.false(result);
});

test("twitter: can normalize user urls", (t) => {
  const urls = ["https://twitter.com/WADHOSHA", "WADHOSHA", "@WADHOSHA"];

  const expected = "https://twitter.com/WADHOSHA";

  const result = every((u) => normalizeTwitterUserUrl(u) === expected, urls);

  t.true(result);
});
