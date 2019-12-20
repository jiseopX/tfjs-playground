const path = require("path");

module.exports = {
  mode: "development",
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "raw-loader"
        }
      }
    ]
  }
};
