import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class Boards {
  async getBoards() {
    const response = await fetch(`${API_BASE_URL}/boards`);
    return response.json();
  }

  async getBoardById(uuid: string) {
    const response = await fetch(`${API_BASE_URL}/boards/${uuid}`);
    return response.json();
  }

  async getBoardPictograms(uuid: string) {
    const response = await fetch(`${API_BASE_URL}/boards/${uuid}/pictograms`);
    return response.json();
  }
}
