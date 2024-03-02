import { useEffect, useState } from "react";
import { Button, Col, message } from "antd";
import { Nullable, Repository } from "../../types";
import RepositoryDetails from "./RepositoryDetails";
import MasterDetail from "../MasterDetail";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";
import { useAuthContext } from "../context/AuthContext";

const PublicRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useAuthContext();
  const [authstate, setAuthState] = useState<any>();
  useEffect(() => {
    const getRepositories = async () => {
      try {
        const repositories: Repository[] = await invoke(
          "get_public_repositories",
          { token: token }
        );

        const authstate: any = await invoke("get_auth_state");
        console.log("The authstate is ", authstate);
        setAuthState(authstate);
        console.log("Public Repositories", repositories);
        setRepositories(repositories);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: getErrorMessage(error),
        });
      }
    };
    getRepositories();
  }, []);

  const title = "Public Repositories";
  const getItemDescription = (repository: Repository) => repository.name;
  const detailLayout = (repository: Nullable<Repository>) => {
    if (!repository) return null;
    return (
      <Col span={18}>
        <RepositoryDetails repository={repository} token={token} />
      </Col>
    );
  };

  const changeState = async() => {
    const changed_auth_state = await invoke("set_auth_state", {newstate: "updated text"});
    console.log("The auth state changed ", changed_auth_state);
    const authstate: any = await invoke("get_auth_state");
        console.log("The authstate is ", authstate);
        setAuthState(authstate);
  }

  return (
    <>
      {contextHolder}
      {authstate ? authstate["access_token"] : <p>sample</p>}
      <Button onClick={changeState}>Change state</Button>
      <MasterDetail
        title={title}
        items={repositories}
        getItemDescription={getItemDescription}
        detailLayout={detailLayout}
      />
    </>
  );
};

export default PublicRepositories;
