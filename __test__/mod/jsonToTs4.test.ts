import { expect, test } from "vitest"
import { jsonToTs } from "../../src"

test("Test JSON with duplicate key name possible", async function () {
    const tc = `
{
    "version": "1",
    "data": {
        "version": {
            "local": true
        }
    },
    "info": {
        "version": {
            "mainVer": 1,
            "subVer": 0,
        }
    },
    "i": {
        "version": {} 
    }
}
    `

    const e = `export type IRoot = { version: string; data: Data; info: Info; i: I }

export interface Version {
    local: boolean
}

export interface Data {
    version: Version
}

export interface InfoVersion {
    mainVer: number
    subVer: number
}

export interface Info {
    version: InfoVersion
}

export interface IVersion {}

export interface I {
    version: IVersion
}
`

    const res = await jsonToTs(tc, { inlineType: !1 })
    expect(res).toBe(e)
})
