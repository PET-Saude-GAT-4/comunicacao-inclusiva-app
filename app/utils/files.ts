import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export function buildFileUrl(fileUuid: string) {
  return `${API_BASE_URL}/files/${fileUuid}`;
}
