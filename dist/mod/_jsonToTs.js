"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports._jsonToTs=void 0;const e=require("../utils/textify");exports._jsonToTs=function r(t,n=!0,o=[],i){if(null===t)return"null";if("string"==typeof t)return"string";if("boolean"==typeof t)return"boolean";if("number"==typeof t||"bigint"==typeof t)return"number";if(Array.isArray(t)){const s=t.map((t=>{const s=r(t,n,o);if(!n&&!Array.isArray(t)&&"object"==typeof t&&null!==t&&i){const r=(0,e.titleCase)(i,"array"),t=`export interface ${r} ${s}`;return o.push(t),r}return s})).filter(((e,r,t)=>t.indexOf(e)>=r));return s.length<2?s.join()+"[]":`(${s.join(" | ")})[]`}if("object"==typeof t&&null!==t){return`{ ${Object.keys(t).map((i=>{const s=t[i],u=r(t[i],n,o,i);if(!n&&!Array.isArray(s)&&"object"==typeof s){const r=(0,e.titleCase)(i),t=`export interface ${r} ${u}`;return o.push(t),`${i}: ${r}`}return`${i}: ${u}`})).join("; ")} }`}throw new Error("Unimplemented deserialize data type "+typeof t)};