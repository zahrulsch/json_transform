import { jsonToTs } from "../../src"
import { test, expect } from "vitest"

test("Must throw error when pass 'undefined' argument", async function () {
    expect(async () => {
        const tCase = "undefined"
        await jsonToTs(tCase)
    }).rejects.toThrow(/^Unexpected token [\w\d]? in JSON at position \d?$/g)
})
test("Must throw error when pass '\"\"' argument", async function () {
    expect(async () => {
        const tCase = ""
        await jsonToTs(tCase)
    }).rejects.toThrow(/^Target is empty$/g)
})

test("Must throw error when pass 'true' argument", async function () {
    expect(async () => {
        const tCase = true
        await jsonToTs(tCase)
    }).rejects.toThrow(/^Invalid input .*$/g)
})
