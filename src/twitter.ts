import {URL} from "url";

import {isNumber, isString, segment} from "./utils";

export const isTwitterFeed = (term?: string | null): boolean => {
  if (!isString(term)) return false;

  if (term.startsWith("http")) {
    const u = new URL(term);
    if (!/twitter\.com/.test(u.hostname)) return false;
    if (
      u.pathname.split("/").filter((x) => x !== "").length === 1 &&
      u.pathname.split("/").filter((x) => x !== "")[0] !== "search"
    )
      return true;
  }

  return false;
};

export const parseTweetId = (term?: string | null): string | undefined => {
  if (!isString(term)) return undefined;
  // /status/.test(u.pathname)) return true;
  if (term.startsWith("http")) {
    const u = new URL(term);

    if (!/twitter\.com/.test(u.hostname)) return undefined;

    // https://twitter.com/Ibrahim_waza/status/1073152537400934400
    // https://twitter.com/Ibrahim_waza/status/1073152537400934400/photo/1
    // https://mobile.twitter.com/Ibrahim_waza/status/1073152537400934400?fbclid=IwAR2429sTkE
    // https://twitter.com/i/status/1073152537400934400
    if (segment(1, u) === "status") return segment(2, u);
  }

  // tweets ids consists only of numbers
  if (/^\d+$/.test(term)) return term;

  return undefined;
};

export const parseTwitterUser = (user: string | number): string => {
  if (isNumber(user)) return user.toString();
  if (user.startsWith("http")) {
    const u = new URL(user);
    return u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
  }
  return user.replace(/^@/, "");
};

export const isTwitterTweet = (term?: string | null): boolean => {
  const tweetId = parseTweetId(term);

  return !!isString(tweetId);
};

export const normalizeTwitterTweetUrl = (url: string): string => {
  const userId = parseTwitterUser(url);
  const tweetId = parseTweetId(url);
  if (userId === tweetId) return `https://twitter.com/i/status/${tweetId}`;
  return `https://twitter.com/${userId}/status/${tweetId}`;
};

export const normalizeTwitterUserUrl = (url: string): string => {
  const userId = parseTwitterUser(url);
  return `https://twitter.com/${userId}`;
};
