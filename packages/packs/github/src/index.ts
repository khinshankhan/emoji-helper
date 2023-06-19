import { type EmojiInfoTemplate } from "@khinshankhan/emoji-helper-core";
import pack from "./pack.json";

// TODO: create and publish a script
/*
   Generated off of https://api.github.com/emojis

   Object.entries(list).map(([name, url]) => {
     return {names: [name], url}
   })
 */

// TODO: add in character equivalents for the applicable emoji
export const githubEmoji = pack satisfies readonly EmojiInfoTemplate[];

export default githubEmoji;
