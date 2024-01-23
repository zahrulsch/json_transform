import { JsonToTsOptions, defaultOptions } from "./_jsonToTsOptions";
/**
 * Parse `JSON` into `TypeScript` types - remove all comment, remove extra comma symbols in JSON
 * you can parse JSON format like `tsconfig.json`
 * @param target - Can be string or object or anything else.
 * @param {JsonToTsOptions} [options={}]
 * */
declare function jsonToTs(target: any, options?: JsonToTsOptions): Promise<string>;
export { jsonToTs, defaultOptions };
export type { JsonToTsOptions };
