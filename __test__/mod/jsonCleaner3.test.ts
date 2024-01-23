import { jsonCleaner } from "../../src/mod/jsonCleaner"
import { test, expect } from "vitest"

const tCase = `[1, 2, 3, "reason"]`
const expectation = `[1,2,3,"reason"]`

test("Test Array JSON", function() {
    const res = jsonCleaner(tCase)
    expect(res).toEqual(expectation)
})