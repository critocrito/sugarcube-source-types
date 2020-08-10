import {isIgnoredTerm, isString, segment} from "./utils";

export const parseYoutubeVideo = (term?: string | null): string | undefined => {
  if (!isString(term)) return undefined;
  if (isIgnoredTerm(term)) return undefined;

  if (term.startsWith("http")) {
    const u = new URL(term);

    // e.g. http://youtu.be/o0tjic523cg
    if (u.hostname.startsWith("youtu.be")) return segment(0, u);

    // e.g. https://www.youtube.com/watch?v=tcCBtSjKEzI
    const id = u.searchParams.get("v");
    if (isString(id)) return id;

    // e.g. https://www.youtube.com/embed/iq_XLq5ONtE?version
    if (u.pathname.startsWith("/embed")) return segment(1, u);
  }

  // e.g. o0tjic523cg
  if (term.length === 11) return term;

  return undefined;
};

export const parseYoutubeChannel = (
  term?: string | null,
): string | undefined => {
  if (!isString(term)) return undefined;
  if (isIgnoredTerm(term)) return undefined;

  if (term.startsWith("http")) {
    const u = new URL(term);

    // Accept channel ids in the form of https://youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A
    if (/youtube\.com/.test(u.hostname) && /channel/.test(u.pathname))
      return segment(1, u);
  }

  // Accept channel id's of the form: UCegnDJbvrOhvbLU3IzeIV8A
  if (term.length === 24 && term.startsWith("U")) return term;

  return undefined;
};

export const isYoutubeVideo = (term?: string | null): boolean => {
  const videoId = parseYoutubeVideo(term);

  return !!isString(videoId);
};

export const isYoutubeChannel = (term?: string | null): boolean => {
  const channelId = parseYoutubeChannel(term);

  return !!isString(channelId);
};

export const normalizeYoutubeVideoUrl = (
  term?: string | null,
): string | undefined => {
  const videoId = parseYoutubeVideo(term);

  return isString(videoId)
    ? `https://www.youtube.com/watch?v=${videoId}`
    : undefined;
};

export const normalizeYoutubeChannelUrl = (
  url?: string | null,
): string | undefined => {
  const channelId = parseYoutubeChannel(url);

  return isString(channelId)
    ? `https://www.youtube.com/channel/${channelId}`
    : undefined;
};
