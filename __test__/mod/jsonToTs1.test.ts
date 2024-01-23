import { jsonToTs } from "../../src"
import { test, expect } from "vitest"

test("Test deserialize Array of number JSON", async function (ctx) {
    const tCase = `[1,2,3,]`
    const eXpect = `export type IRoot = number[]\n`

    const res = await jsonToTs(tCase)
    console.log(res)
    expect(res).toBe(eXpect)
})

test("Test deserialize Array of -> string JSON", async function () {
    const tCase = `["1","2","3",]`
    const eXpect = `export type IRoot = string[]\n`

    const res = await jsonToTs(tCase)
    expect(res).toBe(eXpect)
})

test("Test deserialize Array of -> string or null JSON", async function () {
    const tCase = `["1","2","3",null]`
    const eXpect = `export type IRoot = (string | null)[]\n`

    const res = await jsonToTs(tCase)
    expect(res).toBe(eXpect)
})

test("Test deserialize Array of -> string or null or number JSON", async function () {
    const tCase = `["1","2","3",null,1,3,4,null,345673457346745756]`
    const eXpect = `export type IRoot = (string | null | number)[]\n`

    const res = await jsonToTs(tCase)
    expect(res).toBe(eXpect)
})
