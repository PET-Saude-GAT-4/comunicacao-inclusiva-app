import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(import.meta.dirname);

config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer/expo");
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

export default config;
