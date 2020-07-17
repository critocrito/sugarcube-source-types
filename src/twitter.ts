import {URL} from "url";

import {isNumber, isString, segment} from "./utils";

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

export const parseTwitterUser = (
  term?: string | number | null,
): string | undefined => {
  if (isNumber(term)) return term.toString();

  if (!isString(term)) return undefined;

  if (term.startsWith("http")) {
    const u = new URL(term);

    if (!/twitter\.com/.test(u.hostname)) return undefined;

    // https://twitter.com/search?q=%23موكب14مارس&src=hash
    if (segment(0, u) === "search") return undefined;

    // https://twitter.com/i/status/1073152537400934400
    if (segment(0, u) === "i") return undefined;

    // https://twitter.com/Ibrahim_waza/status/1073152537400934400
    if (segment(1, u) === "status") return segment(0, u);

    // https://twitter.com/WADHOSHA
    return segment(0, u);
  }

  return term.replace(/^@/, "");
};

export const isTwitterTweet = (term?: string | null): boolean => {
  const tweetId = parseTweetId(term);

  return !!isString(tweetId);
};

export const isTwitterFeed = (term?: string | number | null): boolean => {
  const feedId = parseTwitterUser(term);

  return !!feedId;
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
