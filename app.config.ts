import 'dotenv/config';
import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: "comunicacao-inclusiva-app",
  slug: "comunicacao-inclusiva-app",
  version: "1.0.0",
  extra: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default config;
