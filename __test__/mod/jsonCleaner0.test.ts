import { bench, describe, expect, test } from "vitest"
import { jsonCleaner } from "../../src/mod/jsonCleaner"

const testS = `{
    "compiler": "anything",          /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
}`

const expectR = `{"compiler":"anything","target":"es2016"}`

test("Testing clean json with comment", function (ctx) {
    const res = jsonCleaner(testS)
    expect(res, "clean failed").toEqual(expectR)
})

