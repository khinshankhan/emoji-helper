import type { Root as MdastRoot } from "mdast";
import type { Transformer } from "unified";
import { SKIP, visit } from "unist-util-visit";

// https://stackoverflow.com/a/57748845
const braidArrays = <T>(...arrays: T[][]) => {
  const braided: T[] = [];
  for (let i = 0; i < Math.max(...arrays.map((a) => a.length)); i++) {
    arrays.forEach((array) => {
      const item = array[i];
      if (item !== undefined) {
        braided.push(item);
      }
    });
  }
  return braided;
};

// TODO: potentially extract out mdx utils to a package
function createTextNode(value: string) {
  return { type: "text", value };
}

function createMdxNode(
  name: string,
  attributes: { name: string; value: string }[]
) {
  return {
    type: "mdxJsxTextElement",
    name,
    attributes: attributes.map(({ name, value }) => ({
      type: "mdxJsxAttribute",
      name,
      value,
    })),
    children: [],
    data: { _mdxExplicitJsx: true },
  };
}

export const extractEmojiRegex = /(:[+\-_a-zA-Z0-9]+:)/gm;

const defaultOptions = {
  jsx: true,
  jsxElement: "Emoji",
  jsxAttribute: "name",
  validate: (_name: string) => false,
  lookup: (name: string) => name,
  extractEmojiRegex,
};

export function remarkSimpleEmoji(
  givenOptions = defaultOptions
): Transformer<MdastRoot, MdastRoot> {
  const options = { ...defaultOptions, ...givenOptions };

  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (
        // NOTE: makes no sense to check these
        ["root", "mdxjsEsm", "yaml"].includes(node.type) ||
        // NOTE: just so the rest of the function types make sense, these will always be defined
        parent === null ||
        index === null
      ) {
        return;
      }

      // NOTE: this is guranteed but it seems the types are wonky
      // @ts-expect-error
      const nodeValue: string | undefined = node.value;
      if (!nodeValue) return;

      const matches = Array.from(nodeValue.matchAll(options.extractEmojiRegex));
      if (matches.length === 0) return;

      const emptied = [...matches].reverse().reduce(
        (stored, match) => {
          const emoji = match[1] ?? "";
          const l = stored[0].lastIndexOf(emoji);

          const before = stored[0].slice(0, l);
          const after = stored[0].slice(l + emoji.length);
          return [before, after, ...stored.slice(1)];
        },
        [nodeValue]
      );

      const baseTexts = emptied.map((text) => createTextNode(text));

      const intertwineWith = matches.map((match) =>
        !options.validate(match[0]) // bad match with regex, it's just part of baseTexts
          ? createTextNode(match[0])
          : !options.jsx // create text nodes (useful for excerpts)
          ? createTextNode(options.lookup(match[0]))
          : createMdxNode(options.jsxElement, [
              { name: options.jsxAttribute, value: match[0] },
            ])
      );

      const newNodes = braidArrays(baseTexts, intertwineWith);

      // replace text node with the injected emoji nodes
      // TODO: this might break on certain node types
      // @ts-expect-error
      parent.children.splice(index, 1, ...newNodes);
      return [SKIP, index + newNodes.length - 1];
    });
  };
}
