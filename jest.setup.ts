jest.mock("@react-native-async-storage/async-storage", () =>
  jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ),
);

// Services read the base URL once, at import time, so it has to be fixed here
// rather than inside each test.
jest.mock("expo-constants", () => ({
  __esModule: true,
  default: { expoConfig: { extra: { API_BASE_URL: "http://10.0.0.5:3000" } } },
}));

// The sync logs every step on purpose (the RN console freezes on full error
// objects); in tests that is only noise.
jest.spyOn(console, "log").mockImplementation(() => {});
