# emoji-helper

The one-stop to emoji 💃

Several packages for custom emoji manipulation and utility, designed framework agnostic.

- [emoji-helper-core](./packages/core)

  > The heart of emoji-helper
  >
  > This package allows you to define a strongly typed map of emoji data to use in your project. It should likely be used with other packages in [emoji-helper](https://github.com/khinshankhan/emoji-helper).
  >
  > This package gives you the freedom to source your emoji from sources other than just a tweemoji pack. You're free to use your custom emoji from Discord or Slack, and even animated emoji! It's all just name <-> url (+ some meta info) at its core.

- [emoji-helper-remark](./packages/remark)

  > Remark markdown transformer to replace :emoji: in text with jsx

- [emoji-helper-pack-github](./packages/packs/github)
  > Emoji pack using GitHub's assets
