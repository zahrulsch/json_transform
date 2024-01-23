import { jsonCleaner } from "./jsonCleaner"
import { _jsonToTs } from "./_jsonToTs"
import { JsonToTsOptions, defaultOptions } from "./_jsonToTsOptions"

/**
 * Parse `JSON` into `TypeScript` types - remove all comment, remove extra comma symbols in JSON
 * you can parse JSON format like `tsconfig.json`
 * @param target - Can be string or object or anything else.
 * @param {JsonToTsOptions} [options={}]
 * */
async function jsonToTs(
    target: any,
    options: JsonToTsOptions = {}
): Promise<string> {
    options = { ...defaultOptions, ...options }

    if (typeof target === "string") {
        target = jsonCleaner(target.trim())
    } else {
        target = jsonCleaner(String(target).trim())
    }

    if (!target) throw new Error("Target is empty")

    const json = JSON.parse(target)

    if (
        typeof json === "string" ||
        typeof json === "number" ||
        typeof json === "boolean" ||
        typeof json === "symbol" ||
        typeof json === "bigint" ||
        typeof json === "undefined"
    ) {
        throw new Error("Invalid input data type")
    }

    if (!options.rootTypeName) {
        options.rootTypeName = "IRoot"
    }

    let additionalTypes = [] as string[]

    let out =
        "export type " +
        options.rootTypeName +
        " = " +
        _jsonToTs(json, options.inlineType, additionalTypes)

    if (additionalTypes.length) {
        additionalTypes = additionalTypes.filter(
            (it, idx, arr) => arr.indexOf(it) >= idx
        )
        for (const additional of additionalTypes) {
            out = out + "\n\n" + additional + "\n"
        }
    }

    if (!options.withPrettier) {
        return out
    }

    const { format } = await import("prettier/standalone")
    const { default: estree } = await import("prettier/plugins/estree")
    const { default: babel } = await import("prettier/plugins/babel")

    out = await format(out, {
        plugins: [estree, babel],
        parser: "babel-ts",
        printWidth: options.printWidth,
        semi: options.semicolon,
        tabWidth: options.tabWidth,
    })

    return out
}

export { jsonToTs, defaultOptions }
export type { JsonToTsOptions }
