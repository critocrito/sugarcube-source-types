import {isString, isValidUrl, segment} from "./utils";

export const parseTelegramChannel = (
  term?: string | null,
): string | undefined => {
  if (!isString(term)) return undefined;

  if (term.startsWith("http")) {
    if (!isValidUrl(term)) return undefined;

    let u;
    try {
      u = new URL(term);
    } catch {
      return undefined;
    }

    // Telegram channels use t.me as domain name.
    if (!/t\.me/.test(u.hostname)) return undefined;

    // https://t.me/s/soscubamedia
    if (segment(0, u) === "s" && isString(segment(1, u))) return segment(1, u);

    // https://t.me/soscubamediask
    if (isString(segment(0, u)) && segment(0, u) === undefined)
      return segment(0, u);
  }

  // FIXME: Telegram channel names starting with @ are ambiguous with twitter
  // user names.
  // return term.replace(/^@/, "");
  return undefined;
};

export const isTelegramChannel = (term?: string | null): boolean => {
  const channel = parseTelegramChannel(term);

  return isString(channel);
};

export const normalizeTelegramChannelUrl = (
  term?: string | null,
): string | undefined => {
  const channel = parseTelegramChannel(term);

  return isString(channel) ? `https://t.me/s/${channel}` : undefined;
};
