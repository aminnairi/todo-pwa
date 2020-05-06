import copy from "rollup-plugin-copy";
import remove from "rollup-plugin-delete";

import {resolve} from "path";

export default {
    input: resolve("development", "index.js"),

    plugins: [
        remove({
            targets: [
                resolve("production", "*")
            ],
            verbose: true
        }),

        copy({
            targets: [
                {
                    src: resolve("development", "assets", "**", "*"),
                    dest: resolve("production")
                }
            ],
            verbose: true
        }),
    ],

    output: {
        file: resolve("production", "index.js"),
        format: "iife"
    }
}
