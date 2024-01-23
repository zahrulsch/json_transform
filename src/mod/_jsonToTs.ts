import { titleCase } from "../utils/textify"

function _jsonToTs(
    json: any,
    inline = true,
    additionalTypes: string[] = [],
    prevKey?: string
): string {
    if (json === null) return "null"
    if (typeof json === "string") return "string"
    if (typeof json === "boolean") return "boolean"
    if (typeof json === "number" || typeof json === "bigint") return "number"

    if (Array.isArray(json)) {
        const arrayTypes: string[] = json
            .map((it) => {
                const type = _jsonToTs(it, inline, additionalTypes)

                if (
                    !inline &&
                    !Array.isArray(it) &&
                    typeof it === "object" &&
                    it !== null &&
                    prevKey
                ) {
                    let typeName = titleCase(prevKey, "array")

                    // prevent duplicate type
                    const pattern = `(?:interface|type)\\s(${typeName})\\s?=?\\s?{`
                    const re = new RegExp(pattern, "g")
                    const match = additionalTypes
                        .map((it) => re.exec(it))
                        .filter(Boolean)
                        .sort()
                        .pop()

                    if (match) {
                        typeName = titleCase(prevKey) + typeName
                    }

                    const additionalType = `export interface ${typeName} ${type}`
                    additionalTypes.push(additionalType)

                    return typeName
                }

                return type
            })
            .filter((value, index, arrs) => arrs.indexOf(value) >= index)

        if (arrayTypes.length < 2) {
            return arrayTypes.join() + "[]"
        }

        return `(${arrayTypes.join(" | ")})` + "[]"
    }

    if (typeof json === "object" && json !== null) {
        const keypairs: string[] = Object.keys(json).map((key) => {
            const value = json[key]
            const type = _jsonToTs(json[key], inline, additionalTypes, key)

            if (
                !inline &&
                !Array.isArray(value) &&
                typeof value === "object" &&
                value !== null
            ) {
                let typeName = titleCase(key)

                // prevent duplicate type
                const pattern = `(?:interface|type)\\s(${typeName})\\s?=?\\s?{`
                const re = new RegExp(pattern, "g")
                const match = additionalTypes
                    .map((it) => re.exec(it))
                    .filter(Boolean)
                    .sort()
                    .pop()

                if (match) {
                    prevKey = prevKey ? titleCase(prevKey) : "Broken"
                    typeName = prevKey + typeName
                }

                const additionalType = `export interface ${typeName} ${type}`
                additionalTypes.push(additionalType)

                return `${key}: ${typeName}`
            }

            return `${key}: ${type}`
        })

        return `{ ${keypairs.join("; ")} }`
    }

    throw new Error(`Unimplemented deserialize data type ${typeof json}`)
}

export { _jsonToTs }
