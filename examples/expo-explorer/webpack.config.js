const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  if (config.resolve && config.resolve.extensions && Array.isArray(config.resolve.extensions) && !config.resolve.extensions.includes('.web.js')) {
    config.resolve.extensions.push('.web.js')
  }
  return config;
};
