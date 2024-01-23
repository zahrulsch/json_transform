function jsonCleaner(target: string): string {
    let cleaned0 = target
        .trim()
        // replace comment -> /* Sascascascaset tascascasche JavascascaScript....... */
        .replace(/\/\*.*\*\/\n/g, "\n")
        // replace comment -> // anything
        .replace(/\/\/.*\n/g, "\n")
        // replace last comma in last key {..."lastekey": "somevalue", }
        .replace(/,\s*?\n\s*}/g, "\n}")
        // replace last comma in last array member if exists
        .replace(/(,\s*?)]/g, "]")
        // replace bloat spaces before new line
        .replace(/\s*\n/g, "\n")
        // remove all whitespace which not inside double quote string
        // .replace(/(?<=[{:,\]])\s*/gm, "")
        .replace(/(?<=[{:,\[\]])\s*/gm, "")
        .replace(/\s*}/g, "}")
        .replace(/\n/g, "")

    return cleaned0
}

export { jsonCleaner }
