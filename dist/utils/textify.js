export function titleCase(input, context = "object") {
    input = input
        .replace(/^_*?([a-zA-Z0-9])/, (it) => it.toUpperCase())
        .replace(/(?<=[a-zA-Z0-9])(_+?\w)/, (it) => it.toUpperCase())
        .replace(/\s+?(\w)/, (it) => it.trim().toUpperCase());
    if (context == "array") {
        input = input
            .replace(/(?<=[b-df-hj-np-tv-z])s$/, "")
            .replace(/(?<=[b-df-hj-np-tv-z])ies$/, "y");
    }
    return input;
}
