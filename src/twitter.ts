import {URL} from "url";

import {isNumber, isString} from "./utils";

export const isTwitterTweet = (url: string | null | undefined): boolean => {
  if (!isString(url)) return false;

  const u = new URL(url);
  if (/twitter\.com/.test(u.hostname) && /status/.test(u.pathname)) return true;

  return false;
};

export const isTwitterFeed = (url: string | null | undefined): boolean => {
  if (!isString(url)) return false;

  const u = new URL(url);
  if (
    /twitter\.com/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 1 &&
    u.pathname.split("/").filter((x) => x !== "")[0] !== "search"
  )
    return true;

  return false;
};

export const parseTweetId = (id: string | void): string | undefined => {
  if (id === undefined) return undefined;
  if (typeof id !== "string") return undefined;
  if (id.startsWith("http")) {
    const u = new URL(id);
    return u.pathname.split("/").filter((x) => x !== "")[2];
  }
  return id;
};

export const parseTwitterUser = (user: string | number): string => {
  if (isNumber(user)) return user.toString();
  if (user.startsWith("http")) {
    const u = new URL(user);
    return u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[0];
  }
  return user.replace(/^@/, "");
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
