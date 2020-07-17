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

- [`isTwitterTweet`: Determine if a term is a valid Twitter tweet.](#istwittertweet)
- [`isTwitterFeed`: Determine if a term is a valid Twitter feed.](#istwitterfeed)
- [`isYoutubeVideo`: Determine if a term is a valid Youtube video.](#isyoutubevideo)
- [`isYoutubeChannel`: Determine if a term is a valid Youtube channel.](#isyoutubechannel)

</details>

<details><summary>Source type parsers</summary>

- [`parseTweetId`: Extract a tweet id from a term.](#parsetweetid)
- [`parseTwitterUser`: Extract a Twitter user from a term.](#parsetwitteruser)
- [`parseYoutubeVideo`: Extract a Youtube video id from a term.](#parseyoutubevideo)
- [`parseYoutubeChannel`: extract a Youtube channel id from a term.](#parseyoutubechannel)

</details>

<details><summary>Normalize terms</summary>

- [`normalizeTwitterTweetUrl`: Turn a term into a normalized Twitter tweet URL.](#normalizetwittertweeturl)
- [`normalizeTwitterUserUrl`: Turn a term into a normalized Twitter feed URL.](#normalizetwitteruserurl)
- [`normalizeYoutubeVideoUrl`: Turn a term into a normalized Youtube video URL.](#normalizeyoutubevideourl)
- [`normalizeYoutubeChannelUrl`: Turn a term into a normalized Youtube channel URL.](#normalizeyoutubechannelurl)

</details>

### `SourceType`

A string literal type containig valid source types.

- `twitter_tweet`
- `twitter_channel`
- `youtube_video`
- `youtube_channel`

### `sourceType`

Detect the type of a source.

```
sourceType :: (term?: string) -> SourceType | undefined
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

### `parseTweetId`

### `parseTwitterUser`

### `parseYoutubeVideo`

### `parseYoutubeChannel`

### `normalizeTwitterTweetUrl`

### `normalizeTwitterUserUrl`

### `normalizeYoutubeVideoUrl`

### `normalizeYoutubeChannelUrl`

## License

[GPL 3.0 licensed](LICENSE)
