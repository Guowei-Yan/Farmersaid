const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    "entry": "./src/index.js",
    "output": {
        "path": `${__dirname}/public/js`,
        "filename": "bundle.min.js"
    },
    "mode": "production",
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "loader": "babel-loader"
            },
            {
                "test": /\.(gif|png|jpe?g|svg)$/,
                "use": [
                    'file-loader',
                    {
                        "loader": "image-webpack-loader",
                        "options": {
                            "bypassOnDebug": true,
                            "diable": true
                        }
                    }
                ]
            },
            {
                "test": /\.geojson$/,
                "loader": "json-loader"
            }
        ]
    },
    "optimization": {
        "minimize": true,
        "minimizer": [
            new UglifyJsPlugin({
                test: "/public/js/bundle.min.js",
                cache: false,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
}