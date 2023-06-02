const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add the following lines to modify the default configuration
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_OPTIONS: JSON.stringify("--max_old_space_size=4096"),
      },
    })
  );

  return config;
};
