const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin")

module.exports = {
  target: "web",
  entry: "./src/main.tsx",
  output: {
    // publicPath: "https://kavehsajjadi.github.io/wordy/",
    publicPath: "/",
    path: path.resolve(__dirname, "./build"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ["awesome-typescript-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new RemoveServiceWorkerPlugin({ filename: "service-worker.js" }),
  ],
  stats: {
    colors: true,
  },
  devtool: "source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
}
