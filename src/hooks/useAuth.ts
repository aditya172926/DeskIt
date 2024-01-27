import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { GithubAccessTokens, GithubAuthCode, Nullable } from "../types";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<Nullable<GithubAuthCode>>(null);

  const pollAuthApi = async (device_code: string) => {
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
  };

  const authenticate_with_github = async (): Promise<
    Nullable<GithubAccessTokens>
  > => {
    let tokens: Nullable<GithubAccessTokens> = null;
    try {
      const response: any = await invoke("call_api_method", {
        method: "POST",
        url: "https://github.com/login/device/code",
        query: { client_id: "Iv1.6175b5bf7da0d177" },
      });

      const json_response = JSON.parse(response);
      setAuthCode(json_response);
      await invoke("generate_new_window", {
        url: "https://github.com/login/device",
        label: "Authentication",
        title: "GitHub Auth",
      });

      const pollResponse = setInterval(async function () {
        const response = await pollAuthApi(json_response.device_code);
        if (
          response?.error == "expired_token" ||
          response?.error == "access_denied"
        ) {
          clearInterval(pollResponse);
        }
        if (response?.access_token) {
          clearInterval(pollResponse);
          console.log("Response ", response); // successful authentication
          tokens = response;
        }
      }, 6000);
      return tokens;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  };

  return {
    authenticate_with_github,
    authCode,
  };
};

export default useAuth;
