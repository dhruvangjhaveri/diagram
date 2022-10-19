const path = require('path')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]

    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',    
        library: 'lib'
    },
    optimization: {
        minimize: true,
        minimizer: [
            (compiler) => {
            const TerserPlugin = require('terser-webpack-plugin');
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                        },
                    compress: {},

                },
                extractComments: false
            }).apply(compiler);
            }
        ]
    }
} 
