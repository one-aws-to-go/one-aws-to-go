import axios, { Axios, AxiosError } from "axios";
import { validateExtendedFork, validateForks } from "../models/Fork";
import { ForkAwsSecretArgs } from "../models/ForkAwsSecretArgs";

export interface CreateForkRequest {
  name: string;
  templateId: number;
}

class BackendService {
  private backendURL = "TODO";
  private api: Axios;

  constructor(userId: string) {
    this.api = new Axios({
      baseURL: this.backendURL,
      params: { userId },
    });
    return this;
  }

  async createFork(fork: CreateForkRequest) {
    try {
      const res = await this.api.post("/api/forks", fork);
      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getForks() {
    try {
      const response = await this.api.get("/api/forks");

      if (validateForks(response.data)) {
        return response.data;
      }
      throw Error("Invalid data");
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getExtendedFork(forkId: string) {
    try {
      const response = await this.api.get(`/api/forks/${forkId}`);

      if (validateExtendedFork(response.data)) {
        return response.data;
      }
      throw Error("Invalid format on extended fork");
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async setSecrets(forkId: string, secrets: ForkAwsSecretArgs) {
    try {
      const res = await this.api.put(`/api/forks/${forkId}/secrets`, {
        secrets,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default BackendService;
