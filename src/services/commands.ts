import { invoke } from "@tauri-apps/api/tauri";
import { Repository } from "../types";
import  {message} from "antd";
import { getErrorMessage } from "../helper";

const [messageApi] = message.useMessage();

export const getRepositories = async() => {
    try {
        const repositories: Repository[] = await invoke(
          "get_public_repositories"
        );
        console.log("Public Repositories", repositories);
        return repositories;
      } catch (error) {
        messageApi.open({
          type: "error",
          content: getErrorMessage(error),
        });
        return [];
      }
}