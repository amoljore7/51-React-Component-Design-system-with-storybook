const plugins = [
  "@babel/plugin-proposal-class-properties",
  "babel-plugin-transform-scss",
];

const presets = ["@babel/preset-env", "@babel/preset-react"];

module.exports = (api) => {
  api.cache(false);
  return {
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    plugins: [...plugins],
  };
};
