import test from "ava";
import {every} from "lodash/fp";

import {
  isTelegramChannel,
  normalizeTelegramChannelUrl,
  parseTelegramChannel,
} from "../src";
import {notTelegramChannels, telegramChannels} from "./helpers/fixtures";

test("can parse a Telegram channel", (t) => {
  const result = every(
    (u) => parseTelegramChannel(u) === "soscubamedia",
    telegramChannels,
  );

  t.true(result);
});

test("fails on invalid Telegram channels", (t) => {
  const result = every(
    (u) => parseTelegramChannel(u) === undefined,
    notTelegramChannels,
  );

  t.true(result);
});

test("succeeds to determine a Telegram channel", (t) => {
  const result = every(isTelegramChannel, telegramChannels);

  t.true(result);
});

test("succeeds to determine invalid Telegram Channel", (t) => {
  const result = every(isTelegramChannel, notTelegramChannels);

  t.false(result);
});

test("can normalize a Telegram channel", (t) => {
  const result = every(
    (u) => normalizeTelegramChannelUrl(u) === "https://t.me/s/soscubamedia",
    telegramChannels,
  );

  t.true(result);
});

test("fails to normalize invalid Telegram channels", (t) => {
  const result = every(
    (u) => normalizeTelegramChannelUrl(u) === undefined,
    notTelegramChannels,
  );

  t.true(result);
});
