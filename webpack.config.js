module.exports = {
    entry: "./src/DSPlayground.ts",
    output: {
        filename: "./bundle.js",
        library: "DSPlayground"
    },

    mode: "development",
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "eslint-loader", enforce: "pre" },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader" }
        ],
    },

    watch: true,
};