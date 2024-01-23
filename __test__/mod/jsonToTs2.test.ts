import { jsonToTs } from "../../src"
import { test, expect } from "vitest"

test("Deserialize object JSON", async function () {
    const tCase = `{
        /* list of sdchsdjbc */
        // name
        "name": "thoni",
        "list": [12, 23, null],
        "married": false,
    }`
    const eXpect = `export type IRoot = { name: string; list: (number | null)[]; married: boolean }\n`
    const res = await jsonToTs(tCase)
    expect(res).toBe(eXpect)
})

test("Deserialize more complex object JSON", async function () {
    const tCase = `{
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "isStudent": false,
    "grades": [90, 85, 92],
    "address": {
        "street": "123 Main St",
        "_zipCode": "10001"
    }
}`
    const eXpect = `export type IRoot = {
    name: string
    age: number
    city: string
    isStudent: boolean
    grades: number[]
    address: { street: string; _zipCode: string }
}\n`
    const res = await jsonToTs(tCase)
    expect(res).toBe(eXpect)
})
