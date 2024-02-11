const { withPlausibleProxy } = require("next-plausible");
const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: true,
  trailingSlash: false,
  images: {
    domains: ["images.prismic.io", "wecodeni.com", "res.cloudinary.com"],
  },
  sentry: {
    hideSourceMaps: false,
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = (phase, defaultConfig) => {
  const plugins = [
    withPlausibleProxy(),
    (config) => withSentryConfig(config, SentryWebpackPluginOptions),
  ];

  const config = plugins.reduce((config, plugin) => {
    const update = plugin(config);
    return typeof update === "function" ? update(phase, defaultConfig) : update;
  }, nextConfig);

  return config;
};
