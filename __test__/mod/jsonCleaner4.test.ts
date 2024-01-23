import { jsonCleaner } from "../../src/mod/jsonCleaner"
import { expect, test } from "vitest"

const tCase =`[
    1,
    {
        "name": "thoni"
    },
    [1, 2, 3], true,    
]`
const expectation = `[1,{"name":"thoni"},[1,2,3],true]`

test("Test Array JSON 2", function() {
    const res = jsonCleaner(tCase)
    expect(res).toEqual(expectation)
})