# emoji-helper-core

The heart of emoji-helper

This package allows you to define a strongly typed map of emoji data to use in your project. It should likely be used with other packages in [emoji-helper](https://github.com/khinshankhan/emoji-helper).

This package gives you the freedom to source your emoji from sources other than just a tweemoji pack. You're free to use your custom emoji from Discord or Slack, and even animated emoji! It's all just name <-> url (+ some meta info) at its core.

### Install

```sh
pnpm add @khinshankhan/emoji-helper-core
```

### Usage

You need to define an ["emoji pack"](#emoji-pack). Whether it's a single pack or multiple packs, you would just do

```js
export const emojiLookup = createEmojiLookup([pack1, pack2, packn], true, true);
```

to create the strongly typed lookup. It's also recommended to use the following type:

```ts
type MapKey<T> = T extends Map<infer K, any> ? K : never;
export type EmojiKey = MapKey<typeof emojiLookup>;
```

Afterwards you can use the lookup like `const emojiInfo = emojiLookup.get(name)` and proceed to use the emoji info. Note that the name will have to have colons surrounding it, eg `tada` would be `:tada:`.

#### Params

createEmojiLookup takes in

- `emojiPacks` of type `EmojiPack[]`
  - info about the emoji you'd like to use in the lookup, view ["emoji pack"](#emoji-pack)
- `overwrite` of type `boolean`
  - defaults to false
  - if a duplicate emoji name is encountered, should it overwrite previous info?
- `merge` of type `boolean`
  - default to false
  - if a duplicate emoji name is encountered, should it attempt to merge with previous info?
- `supressOverwriteWarnings` of type `boolean`
  - defaults to false
  - if a duplicate emoji name is encountered, should it throw an error? (useful for injections eg with emoji-helper-remark)

### Emoji Pack

An emoji pack is simply info about a collection of emoji. A single emoji's info should be

```
export interface EmojiInfoTemplate {
  names: readonly string[];
  url: string;

  char?: string;
  description?: string;
}
```

where only `names` and `url` are needed. `names` are the emoji name and any aliases associated with it. It's an array because aliases are apparently common enough, eg `:octagonal_sign:` and `:stop_sign:`.

`char` may come in handy if, for example, you create a component that needs an ascii character such as

```jsx
<img
  src={emojiInfo.url}
  alt={emojiInfo.char}
  aria-label={emojiInfo.alt}
  height="72px"
  width="72px"
/>
```

If you need custom info, rather than abusing char or description, let me know so I can add a new field to the type. Personally haven't needed it so I've just skimped out on it to make a package available immediately.

### TODO

- allow names to be a single string or multiple strings
- allow for optional surrounding colons
