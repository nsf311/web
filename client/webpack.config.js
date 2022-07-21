var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: { presets: ['@babel/env','@babel/preset-react'] }
            },
            {
                test:  /\.(sass|less|css)$/,
                use: ['style-loader', 'css-loader'],

            },
            {
                test:  /\.less$/,
                loader: 'less-loader', 
                options: { math: { 'parens-division': true, } }
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
       
    })],
    // plugins: [
    //     new HtmlWebpackPlugin()
    // ],
    
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:3000'
        })
    }
}