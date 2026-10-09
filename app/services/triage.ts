import { triageAdapter } from "@/adapters/triageAdapter";
import { ApiTriageStep, TriageStep } from "@/types/triage.types";
import { request } from "@/utils/apiUtils";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class TriageService {
  async getTriageSteps(): Promise<TriageStep[]> {
    const response = await request(`${API_BASE_URL}/public/triage-steps`);

    // The API already returns the steps in level order, published boards only.
    return response.triageSteps.map((step: ApiTriageStep) =>
      triageAdapter.toTriageStep(step),
    );
  }
}
