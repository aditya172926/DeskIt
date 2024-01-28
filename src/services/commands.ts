import { invoke } from "@tauri-apps/api/tauri";
import { Repository } from "../types";

export const getRepositories = async () => {
  try {
    const repositories: Repository[] = await invoke("get_public_repositories");
    console.log("Public Repositories", repositories);
    return repositories;
  } catch (error) {
    console.log("Error in getRepository ", error);
    return [];
  }
};

export const pollAuthApi = async (device_code: string) => {
  try {
    let response: any = await invoke("call_api_method", {
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      query: {
        client_id: "Iv1.6175b5bf7da0d177",
        device_code: device_code,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      },
    });
    response = JSON.parse(response);
    return response;
  } catch (error) {
    console.log("Error in pollAuthApi function ", error);
    return null;
  }
};