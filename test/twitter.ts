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
import {
  notTwitterTweets,
  twitterFeeds,
  twitterTweets,
} from "./helpers/fixtures";

test("can parse a regular id string", (t) => {
  const result = every(
    (u) => parseTweetId(u) === "1073152537400934400",
    twitterTweets,
  );

  t.true(result);
});

test("ignore non twitter URLS when parsing tweet ids", (t) => {
  const result = parseTweetId("http://example.com/tweet");

  t.is(result, undefined);
});

test("fails to parse tweet ids when id is invalid", (t) => {
  // eslint-disable-next-line unicorn/no-null
  const tweetIds = ["gibberish", undefined, null];

  const result = every((u) => parseTweetId(u) === undefined, tweetIds);

  t.true(result);
});

test("can parse a user name", (t) => {
  const userNames = ["my_user", "@my_user", "https://twitter.com/my_user"];
  const expected = "my_user";

  userNames.forEach((u) => {
    const result = parseTwitterUser(u);
    t.is(result, expected);
  });
});

test("can parse a user id", (t) => {
  const userNames = [3067493325, "3067493325"];
  const expected = "3067493325";

  userNames.forEach((u) => {
    const result = parseTwitterUser(u);
    t.is(result, expected);
  });
});

test("can check tweet urls", (t) => {
  const result = every(isTwitterTweet, twitterTweets);

  t.true(result);
});

test("fails non tweet urls", (t) => {
  const result = every(isTwitterTweet, notTwitterTweets);

  t.false(result);
});

test("fails non feed urls", (t) => {
  const result = every(isTwitterTweet, twitterFeeds);

  t.false(result);
});

test("fails the predicate on undefined tweets", (t) => {
  // eslint-disable-next-line unicorn/no-null
  t.false(every(isTwitterTweet, ["gibberish", undefined, null]));
});

/*
 * Twitter Feeds Predicate: isTwitterFeed
 */
test("feed predicate succeeds on feed urls", (t) => {
  const result = every(isTwitterFeed, twitterFeeds);

  t.true(result);
});

test("tweet predicate fails on feed urls", (t) => {
  const result = every(isTwitterFeed, twitterTweets.concat(notTwitterTweets));

  t.false(result);
});

test("feed predicate on undefined feed", (t) => {
  // eslint-disable-next-line unicorn/no-null
  t.false(every(isTwitterFeed, [undefined, null]));
});

/*
 * Normalize Tweet Urls: normalizeTwitterTweetUrl
 */
test("can normalize tweet urls", (t) => {
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

test("can normalize tweet ids", (t) => {
  const terms = [
    "https://twitter.com/i/status/1073152537400934400",
    "1073152537400934400",
  ];

  const expected = "https://twitter.com/i/status/1073152537400934400";

  const result = every((u) => normalizeTwitterTweetUrl(u) === expected, terms);

  t.true(result);
});

test("fail to normalize invalid tweet inputs", (t) => {
  // eslint-disable-next-line unicorn/no-null
  const invalidUrls = [undefined, null];

  const result = every(
    (u) => normalizeTwitterTweetUrl(u) === undefined,
    invalidUrls,
  );

  t.true(result);
});

/*
 * Normalize User Urls: normalizeTwitterUserUrl
 */
test("can normalize user urls", (t) => {
  const urls = ["https://twitter.com/WADHOSHA", "WADHOSHA", "@WADHOSHA"];

  const expected = "https://twitter.com/WADHOSHA";

  const result = every((u) => normalizeTwitterUserUrl(u) === expected, urls);

  t.true(result);
});

test("fail to normalize invalid user inputs", (t) => {
  // eslint-disable-next-line unicorn/no-null
  const invalidUrls = [undefined, null];

  const result = every(
    (u) => normalizeTwitterUserUrl(u) === undefined,
    invalidUrls,
  );

  t.true(result);
});

["", "about:blank", "about:newtab", "about:config"].forEach((term) => {
  test(`ignore false positives: ${
    term === "" ? "empty string" : term
  }`, (t) => {
    t.false(isTwitterTweet(term));
    t.false(isTwitterFeed(term));
  });
});
