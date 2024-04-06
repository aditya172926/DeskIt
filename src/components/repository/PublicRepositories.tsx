import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../helper";
import { Nullable, Repository } from "../../types";
import MasterDetail from "../MasterDetail";
import { useAuthContext } from "../context/AuthContext";
import RepositoryDetails from "./RepositoryDetails"; 

const PublicRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { token } = useAuthContext();
  useEffect(() => {
    const getRepositories = async () => {
      try {
        const repositories: Repository[] = await invoke(
          "get_public_repositories",
          { token: token }
        );

        const authstate: any = await invoke("get_auth_state");
        console.log("The authstate is ", authstate);
        // setAuthState(authstate);
        console.log("Public Repositories", repositories);
        setRepositories(repositories);
      } catch (error) {
        throw new Error("Repository fetch error");
      }
    };
    getRepositories();
  }, []);

  const title = "Public Repositories";
  const getItemDescription = (repository: Repository) => repository.name;
  const detailLayout = (repository: Nullable<Repository>) => {
    if (!repository) return null;
    return (
        <RepositoryDetails repository={repository} token={token} />
    );
  };

  return (
    <>
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
