import json from './deploy.json' assert {type: "json"};

// We create an object through the json to add support to nx library functionalities while supporting the dev server absolute import of the .json
/** @typedef {import("./types").IConfig} Config */
/** @type {Config} */
export const config = json;
