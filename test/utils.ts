import test from "ava";
import {URL} from "url";

import {isValidUrl, segment} from "../src/utils";

test("select segments from an URL path", (t) => {
  const url = new URL("http://example.org/seg1/seg2/seg3");
  // with slash at the end
  const url2 = new URL("http://example.org/seg1/seg2/seg3/");

  ["seg1", "seg2", "seg3"].forEach((seg, idx) => {
    t.is(segment(idx, url), seg);
    t.is(segment(idx, url2), seg);
    t.is(segment(idx, url), segment(idx, url2));
  });

  // Segments that are not available.
  t.is(segment(10, url), undefined);
  t.is(segment(10, url2), undefined);
});

test("handle url without a path", (t) => {
  const url = new URL("http://example.org");

  t.is(segment(0, url), undefined);
  t.is(segment(3, url), undefined);
});

test("match valid URLs", (t) => {
  ["http", "https"].forEach((proto) => {
    ["t.me", "example.org"].forEach((url) => {
      t.true(isValidUrl(`${proto}://${url}`));
      t.true(isValidUrl(`${proto}://www.${url}`));
      t.true(isValidUrl(`${proto}://${url}/path/segment?q=term`));
      t.true(isValidUrl(`${proto}://www.${url}/path/segment?q=term`));
    });
  });
});
