module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./bundle.js",
        library: "DSPlayground"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        // alias: {
        //     "fabric": path.resolve(__dirname, './node_modules/fabric/dist/fabric.js')
        // }
    },

    // externals : {
    //     "fabric" : "require('fabric')"
    // },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader" }
        ],

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // ]
    },

    // Other options...
};