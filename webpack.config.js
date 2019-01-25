const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: __dirname + "/dist",
        filename: './bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },


            { test: /\.css$/, use: ['style-loader', 'css-loader'] },

        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        "react-dom": "ReactDOM"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: "source-map",
};