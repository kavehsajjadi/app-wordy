module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]],
    },
  })
  config.module.rules.push({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  })
  config.resolve.extensions.push(".ts", ".tsx")
  config.resolve.modules.push("../src", "../node_modules")
  return config
}
