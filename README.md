## JSON_TRANSFORM Library

Library / module ini ditulis bertujuan untuk transformasi data JSON kedalam typing beberapa bahasa diantarnya:

#### 1. TypeScript

Gunakan function `jsonToTs` untuk merubah input berupa JSON string kedalam TypeScript, function ini juga sudah mendukung output yang sudah terformat menggunakan library `prettier`. Function sudah dilengkapi dengan filter komentar, input JSON bisa mengandung komentar seperti pada file `tsconfig.json` Contoh penggunaan:

```ts
import { jsonToTs } from "json_transform"
import type { JsonToTsOptions } from "json_transform"

const jsonString: string = `{
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

const options: JsonToTsOptions = {
    inline: false,
    printWidth: 60,
}

const transformed = await jsonToTs(jsonString, options)
console.log(transformed)

// Output vvvvvvvv
//
// export type IRoot = {
//     name: string
//     age: number
//     city: string
//     isStudent: boolean
//     grades: number[]
//     address: Address
// }
//
// export interface Local {
//     pas: boolean
//     journals: number[]
// }

// export interface Address {
//     street: string
//     zipCode: string
//     local: Local
// }
```
