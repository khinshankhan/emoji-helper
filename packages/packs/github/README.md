# emoji-helper-pack-github

Emoji pack using GitHub's assets

### Install

```sh
pnpm add @khinshankhan/emoji-helper-pack-github
```

### Usage

In unison with emoji-helper-core, you can use the pack as part of your lookup eg

```js
import githubEmoji from "@khinshankhan/emoji-helper-pack-github";

export const emojiLookup = createEmojiLookup(
  [githubEmoji, customEmoji],
  true,
  true
);
```

### TODO

- add in ascii char
- automate this away
- add in emoji descriptions
