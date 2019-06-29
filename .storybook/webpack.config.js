const path = require("path")

module.exports = ({ config }) => {
  // remove the default .css rule storybook applies
  config.module.rules.splice(2,1)
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
      },
    ],
  })
  config.module.rules.push({
    test: /\.css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 0,
          modules: {
            mode: "local",
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
            context: path.resolve(__dirname, "..", "src"),
          },
        },
      },
    ],
  })
  config.resolve.extensions.push(".ts", ".tsx")
  config.resolve.modules.push("../src", "../node_modules")
  return config
}
