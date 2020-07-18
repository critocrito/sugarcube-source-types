import {URL} from "url";

import {isString} from "./utils";

export const parseHttpUrl = (term?: string | null): string | undefined => {
  if (!isString(term)) return undefined;

  let u;
  try {
    u = new URL(term);
  } catch {
    return undefined;
  }

  return u.toString();
};

export const isHttpUrl = (term?: string | null): boolean => {
  const url = parseHttpUrl(term);

  return isString(url);
};

export const normalizeHttpUrl = (term?: string | null): string | undefined => {
  const url = parseHttpUrl(term);

  return isString(url) ? url : undefined;
};
