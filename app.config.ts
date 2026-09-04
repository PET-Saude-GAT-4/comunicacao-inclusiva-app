import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? "comunicacao-inclusiva-app",
  slug: config.slug ?? "comunicacao-inclusiva-app",
  extra: {
    ...config.extra,
    API_BASE_URL: process.env.API_BASE_URL,
  },
});

