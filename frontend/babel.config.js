const babelConfig = (api) => {
  if (api) {
    api.cache(false);
  }

  const presets = ["babel-preset-expo"];
  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          tailwind: "./tailwind",
        },
        cwd: "babelrc",
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};

module.exports = babelConfig;
