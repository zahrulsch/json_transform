import { test, expect } from "vitest"
import { titleCase } from "../../src/utils/textify"

test.each([
    // [testCase, expect]
    ["arguMent", "ArguMent", "object"],
    ["ArguMent", "ArguMent", "object"],
    ["_arguMent", "_ArguMent", "object"],
    ["argu_ment", "Argu_Ment", "object"],
    ["argument", "Argument", "object"],
    ["argu_Ment_", "Argu_Ment_", "object"],
    ["argu ment", "ArguMent", "object"],
    ["contacts", "Contact", "array"],
    ["Stories", "Story", "array"],
])("Test textify0", function (testCase, exp, context) {
    expect(titleCase(testCase, context as any)).toBe(exp)
})
