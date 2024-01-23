export type JsonToTsOptions = {
    /**
     * Only available when `withPrettier` is `true`
     * @default 4 */
    tabWidth?: number

    /** @default true */
    inlineType?: boolean

    /** @default "IRoot" */
    rootTypeName?: string

    /** @default true */
    withPrettier?: boolean

    /**
     * Only available when `withPrettier` is `true`
     * @default false */
    semicolon?: boolean

    /**
     * Only available when `withPrettier` is `true`
     * @default 80 */
    printWidth?: number
}

export const defaultOptions: Required<JsonToTsOptions> = {
    inlineType: true,
    tabWidth: 4,
    withPrettier: true,
    semicolon: false,
    printWidth: 80,
    rootTypeName: "IRoot",
}
