import test from "ava";
import {every} from "lodash/fp";

import {isHttpUrl, normalizeHttpUrl, parseHttpUrl} from "../src";
import {httpUrls, notHttpUrls} from "./helpers/fixtures";

test("can parse a HTTP url", (t) => {
  const result = every((u) => parseHttpUrl(u) === u, httpUrls);

  t.true(result);
});

test("fails on invalid HTTP urls", (t) => {
  const result = every((u) => parseHttpUrl(u) === undefined, notHttpUrls);

  t.false(result);
});

test("succeeds to determine a HTTP url", (t) => {
  const result = every(isHttpUrl, httpUrls);

  t.true(result);
});

test("succeeds to determine invalid HTTP url", (t) => {
  const result = every(isHttpUrl, notHttpUrls);

  t.false(result);
});

test("can normalize a HTTP url", (t) => {
  const result = every((u) => normalizeHttpUrl(u) === u, httpUrls);

  t.true(result);
});

test("fails to normalize invalid HTTP urls", (t) => {
  const result = every((u) => normalizeHttpUrl(u) === undefined, notHttpUrls);

  t.false(result);
});
