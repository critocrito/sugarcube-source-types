import {URL} from "url";

import {isString} from "./utils";

export const parseYoutubeVideo = (query: string): string => {
  // e.g. o0tjic523cg
  if (!query.startsWith("http")) return query;

  const u = new URL(query);

  // e.g. http://youtu.be/o0tjic523cg
  if (u.hostname.startsWith("youtu.be"))
    return u.pathname.split("/").filter((segment) => segment.length > 0)[0];

  // e.g. https://www.youtube.com/watch?v=tcCBtSjKEzI
  const id = u.searchParams.get("v");
  if (isString(id)) return id;

  // e.g. https://www.youtube.com/embed/iq_XLq5ONtE?version
  if (u.pathname.startsWith("/embed"))
    return u.pathname.split("/").filter((x) => x !== "")[1];

  // FIXME: Should I throw if the url can't be parsed?
  return query;
};

export const parseYoutubeChannel = (query: string): string => {
  if (query.startsWith("http")) {
    const u = new URL(query);
    return u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/")[1];
  }
  return query;
};

export const isYoutubeVideo = (term?: string): boolean => {
  if (!isString(term)) return false;

  const u = new URL(term);
  // e.g. https://www.youtube.com/watch?v=tcCBtSjKEzI
  // eslint-disable-next-line unicorn/no-null
  if (/youtube\.com/.test(u.hostname) && u.searchParams.get("v") != null)
    return true;
  // e.g. http://youtu.be/o0tjic523cg
  if (
    /youtu\.be/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 1
  )
    return true;
  // e.g. https://www.youtube.com/embed/iq_XLq5ONtE?version
  if (
    /youtube\.com/.test(u.hostname) &&
    u.pathname.split("/").filter((x) => x !== "").length === 2 &&
    u.pathname.split("/").filter((x) => x !== "")[0] === "embed"
  )
    return true;

  return false;
};

export const isYoutubeChannel = (term?: string): boolean => {
  if (!isString(term)) return false;

  const u = new URL(term);
  if (/youtube\.com/.test(u.hostname) && /channel/.test(u.pathname))
    return true;

  return false;
};

export const normalizeYoutubeVideoUrl = (url: string): string => {
  const videoId = parseYoutubeVideo(url);
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const normalizeYoutubeChannelUrl = (url: string): string => {
  const channelId = parseYoutubeChannel(url);
  return `https://www.youtube.com/channel/${channelId}`;
};
