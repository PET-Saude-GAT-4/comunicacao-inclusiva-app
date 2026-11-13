/** @type {import('jest').Config} */
export default {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Metro turns SVGs into components through react-native-svg-transformer;
    // tests only need something renderable in their place.
    "\\.svg$": "<rootDir>/test/svgStub.tsx",
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
};
