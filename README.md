# Source Types for Sugarcube

> Utility functions to deal with different types of sources for Sugarcube.

<div align="center">

![CI Status](https://img.shields.io/github/workflow/status/critocrito/sugarcube-source-types/CI?style=flat-square)
[![Code Coverage](https://codecov.io/gh/critocrito/sugarcube-source-types/branch/master/graph/badge.svg)](https://codecov.io/gh/critocrito/sugarcube-source-types)
![GitHub](https://img.shields.io/github/license/critocrito/sugarcube-source-types?color=blue&style=flat-square)

</div>

---

`@sugarcube/source-types` provides utility functions for the [Sugarcube Tools](https://sugarcubetools.net) distribution. The utility functions can parse, normalize and verify terms in respect to the type of the source. This packages is used across various parts of the Sugarcube distribution, such as [Ncube](https://github.com/critocrito/ncube), the [Sugarcube Discovery Extension](https://github.com/critocrito/sugarcube-discovery) and [Sugarcube](https://github.com/critocrito/sugarcube) itself.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

```sh
npm install --save @sugarcube/source-types
```

## Usage

```javascript
import {sourceType} from "@sugarcube/source-types";

sourceType("I'm gibberish"); // undefined
sourceType("https://youtube.com/watch?v=wer23edsa"); // youtube_video
```

## API

<details><summary>Map source type for a term</summary>

- [`SourceType`: Valid types of sources.](#sourcetype-1)
- [`sourceType`: Determine source type for any term.](#sourcetype-2)

</details>

<details><summary>Source type predicates</summary>

- [`isTelegramChannel`: Determine if a term is a valid Telegram channel.](#istelegramchannel)
- [`isTwitterTweet`: Determine if a term is a valid Twitter tweet.](#istwittertweet)
- [`isTwitterFeed`: Determine if a term is a valid Twitter feed.](#istwitterfeed)
- [`isYoutubeVideo`: Determine if a term is a valid Youtube video.](#isyoutubevideo)
- [`isYoutubeChannel`: Determine if a term is a valid Youtube channel.](#isyoutubechannel)
- [`isHttpUrl`: Determine if a term is a valid HTTP url.](#ishttpurl)

</details>

<details><summary>Source type parsers</summary>

- [`parseTelegramChannel`: Extract a Telegram channel from a term.](#parsetelegramchannel)
- [`parseTweetId`: Extract a tweet id from a term.](#parsetweetid)
- [`parseTwitterUser`: Extract a Twitter user from a term.](#parsetwitteruser)
- [`parseYoutubeVideo`: Extract a Youtube video id from a term.](#parseyoutubevideo)
- [`parseYoutubeChannel`: Extract a Youtube channel id from a term.](#parseyoutubechannel)
- [`parseHttpUrl`: Parse a term into a valid HTTP url.](#parsehttpurl)

</details>

<details><summary>Normalize terms</summary>

- [`normalizeTelegramChannelUrl`: Turn a term into a normalized Telegram Channel
  URL.](#normalizetelegramchannelurl)
- [`normalizeTwitterTweetUrl`: Turn a term into a normalized Twitter tweet URL.](#normalizetwittertweeturl)
- [`normalizeTwitterUserUrl`: Turn a term into a normalized Twitter feed URL.](#normalizetwitteruserurl)
- [`normalizeYoutubeVideoUrl`: Turn a term into a normalized Youtube video URL.](#normalizeyoutubevideourl)
- [`normalizeYoutubeChannelUrl`: Turn a term into a normalized Youtube channel URL.](#normalizeyoutubechannelurl)
- [`normalizeHttpUrl`: Turn a term into a normalized HTTP url.](#normalizehttpurl)

</details>

### `SourceType`

A string literal type containig valid source types.

- `telegram_channel`
- `twitter_tweet`
- `twitter_channel`
- `youtube_video`
- `youtube_channel`
- `http_url`

### `sourceType`

Detect the type of a source.

```
sourceType :: (term?: string) -> SourceType | undefined
```

### `isTelegramChannel`

Check if a term is a valid Telegram channel.

```
isTelegramChannel :: (term?: string) -> boolean
```

### `isTwitterTweet`

Check if a term is a valid Twitter tweet.

```
isTwitterTweet :: (term?: string) -> boolean
```

### `isTwitterFeed`

Check if a term is a valid Twitter channel.

```
isTwitterFeed :: (term?: string) -> boolean
```

### `isYoutubeVideo`

Check if a term is a valid Youtube video.

```
isYoutubeVideo :: (term?: string) -> boolean
```

### `isYoutubeChannel`

Check if a term is a valid Youtube channel.

```
isYoutubeChannel :: (term?: string) -> boolean
```

### `isHttpUrl`

Check if a term is a valid HTTP url.

```
isHttpUrl :: (term?: string) -> boolean
```

### `parseTelegramChannel`

Extract a Telegram channel from a term.

```
parseTelegramChannel :: (term?: string) -> string | undefined
```

```javascript
parseTelegramChannel("https://t.me/s/soscubamedia"); # soscubamedia
parseTelegramChannel("https://t.me/soscubamedia"); # soscubamedia
```

Channel names in the form of `@soscubamedia` are not valid since they are ambiguous with Twitter user handlers.

### `parseTweetId`

Extract a tweet id from a term.

```
parseTweetId :: (term?: string) -> string | undefined
```

### `parseTwitterUser`

Extract a Twitter user name from a term.

```
parseTwitterUser :: (term?: string) -> string | undefined
```

### `parseYoutubeVideo`

Extract a Youtube video id from a term.

```
parseYoutubeVideo :: (term?: string) -> string | undefined
```

### `parseYoutubeChannel`

Extract a Youtube channel id from a term.

```
parseYoutubeChannel :: (term?: string) -> string | undefined
```

### `parseHttpUrl`

Parse a term and return a HTTP url.

```
parseHttpUrl :: (term?: string) -> string | undefined
```

### `normalizeTelegramChannelUrl`

Parse a Telegram channel from a term and return a normalized Telegram channel URL.

```
normalizeTelegramChannelUrl :: (term?: string) -> string | undefined
```

### `normalizeTwitterTweetUrl`

Parse a Twitter tweet id from a term and return a normalized Twitter tweet URL.

```
normalizeTwitterTweetUrl :: (term?: string) -> string | undefined
```

### `normalizeTwitterUserUrl`

Parse a Twitter user name from a term and return a normalized Twitter feed URL.

```
normalizeTwitterUserUrl :: (term?: string) -> string | undefined
```

### `normalizeYoutubeVideoUrl`

Parse a Youtube Video id from a term and return a normalized Youtube video URL.

```
normalizeYoutubeVideoUrl :: (term?: string) -> string | undefined
```

### `normalizeYoutubeChannelUrl`

Parse a Youtube channel id from a term and return a normalized Youtube channel URL.

```
normalizeYoutubeChannelUrl :: (term?: string) -> string | undefined
```

### `normalizeHttpUrl`

Turn a term into a well formed HTTP url.

```
normalizeHttpUrl :: (term?: string) -> string | undefined
```

## License

[GPL 3.0 licensed](LICENSE)
