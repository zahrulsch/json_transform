import { test, expect } from "vitest"
import { jsonToTs } from "../../src"

test('Test deserialize -> complex JSON with inline is "false"', async function () {
    const tCase = `{
        /* person name */
        "name": "John Doe",
        // person age
        "age": 30,
        "city": "New York", // city
        "isStudent": false,
        "grades": [90, 85, 92],
        "address": {
            "street": "123 Main St",
            "zipCode": "10001",
            "local": {
                "pas": true,
                "journals": [1234, 456],
            }
        }
    }`
    const eXpect = `export type IRoot = {
    name: string
    age: number
    city: string
    isStudent: boolean
    grades: number[]
    address: Address
}

export interface Local {
    pas: boolean
    journals: number[]
}

export interface Address {
    street: string
    zipCode: string
    local: Local
}\n`

    const res = await jsonToTs(tCase, { inlineType: !1, printWidth: 60 })
    expect(res).toBe(eXpect)
})

test('Test deserialize -> complex JSON with inline is "false" 2', async function () {
    const tCase = `{
    "name": "John Doe",
    "age": 30,
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "zipcode": "12345"
    },
    "contacts": [
        {
            "type": "email",
            "value": "john.doe@example.com"
        },
        {
            "type": "phone",
            "value": "555-1234"
        },
        1
    ],
    "friends": [
        {
            "name": "Alice",
            "age": 28
        },
        {
            "name": "Bob",
            "age": 32
        },
        null,
    ]
}`
    const eXpect = `export type IRoot = {
    name: string
    age: number
    address: Address
    contacts: (Contact | number)[]
    friends: (Friend | null)[]
}

export interface Address {
    street: string
    city: string
    zipcode: string
}

export interface Contact {
    type: string
    value: string
}

export interface Friend {
    name: string
    age: number
}\n`

    const res = await jsonToTs(tCase, { inlineType: !1 })
    expect(res).toBe(eXpect)
})
