var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        loader: "less-loader",
        options: { math: { "parens-division": true } },
      },
      {
        test: /\.svg$/,
        loader: "svg-url-loader",
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
                name: "assets/[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  // plugins: [
  //     new HtmlWebpackPlugin()
  // ],

  devServer: {
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      //apiUrl: "http://localhost:3000",
      apiUrl:"/api"
    }),
  },
};
