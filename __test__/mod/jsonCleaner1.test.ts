import { jsonCleaner } from "../../src/mod/jsonCleaner"
import { test, expect } from 'vitest'

const tCase = `{
    "compiler": "anything  \"  ",          /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "rewards": [1, 2, 3, 4,],
}`

const expectation = `{"compiler":"anything  \"  ","target":"es2016","rewards":[1,2,3,4]}`

test("Test clean with array with last comma", function() {
    const res = jsonCleaner(tCase)
    expect(res).toEqual(expectation)
})