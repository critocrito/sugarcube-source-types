export const isNumber = (x: unknown): x is number => {
  return typeof x === "number";
};

export const isString = (x: unknown): x is string => {
  return typeof x === "string";
};

export const segment = (position: number, url: URL): string | undefined => {
  // handle urls that have no path.
  if (url.pathname === "/") return undefined;

  const segments = url.pathname
    // strip slashes from start and end
    .replace(/^\//, "")
    .replace(/\/$/, "")
    // break the path into valid paths.
    .split("/");

  return segments[position];
};

export const isIgnoredTerm = (term: string): boolean => {
  return ["", "about:blank", "about:newtab", "about:config"].includes(term);
};

export const isValidUrl = (term: string): boolean => {
  const res = term.match(
    /(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/g,
  );
  return res !== null;
};
