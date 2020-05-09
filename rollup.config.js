import copy from "rollup-plugin-copy";
import remove from "rollup-plugin-delete";

import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

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

        process.env.NODE_ENV === "production" && terser()
    ],

    output: {
        file: resolve("production", "index.js"),
        format: "iife"
    }
};
