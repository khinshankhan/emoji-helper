# emoji-helper-remark

Remark markdown transformer to replace :emoji: in text with jsx

### Install

```sh
pnpm add @khinshankhan/emoji-helper-remark
```

### Usage

First, you need to define an emoji lookup and then in your remark plugins you can use it likeso

```js
[
  remarkSimpleEmoji,
  {
    validate: (name: string) => emojiLookup.get(name as EmojiKey),
    lookup: (name: string) => {
      const emoji = emojiLookup.get(name as EmojiKey)
      // NOTE: this should be guranteed due to validate
      return emoji!.alt
    },
  },
],
```

#### Params

The param (second argument in the array, the whole object) is

```ts
{
  jsx?: boolean,
  jsxElement?: string,
  jsxAttribute?: string,
  validate?: (string) => boolean,
  lookup?: (string) => string,
}
```

The `jsx` flag determines whether or not to inject an mdx node (true) or to use a text node (false), and it defaults to true.

The `jsxElement` key is the name of the injected mdx node. In whatever mdx library you use, you will have to provide a component with this name, and it defaults to `Emoji`.

The `jsxAttribute` key is the attribute to map the emoji name onto the jsxElement, it defaults to `name`. So, if the text is `Hello :wave`, this will essentially be `Emoji({ name: ":wave:" })` by default settings (which is equivalent to `<Emoji name=":wave:" />`).

The `validate` key helps cull down false positive matches. I'm no regex master so you may end up with some weird string activating the injection like `:weird:` (it won't match _that_, but it could match something not in your emoji lookup). When validate returns false, it'll just create a text node instead of trying to use an emoji.

The `lookup` key lets you use your lookup info in text nodes. The jsx flag should be false for this. Eg you may want to turn `Hello :wave:` into `Hello 👋` using the ascii value rather than an mdx component because you want to use it for SEO or something. Whatever lookup returns for the name is what gets used.

### TODO

- fix types
