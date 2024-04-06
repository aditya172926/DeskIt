import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import RepositoryDetails from "./RepositoryDetails";
import MasterDetail from "../MasterDetail";
import { Nullable, Repository } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";

const PrivateRepositories = () => {
  const { token } = useAuthContext();
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const getRepositories = async () => {
      if (token) {
        try {
          const repositories: Repository[] = await invoke(
            "get_repositories_for_authenticated_user",
            { token }
          );
          setRepositories(repositories);
        } catch (error) {
          throw new Error("Error in private repos");
        }
      }
    };
    getRepositories();
  }, [token]);

  const title = "Private Repositories";
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
        detailLayout={detailLayout}
        getItemDescription={getItemDescription}
      />
    </>
  );
};

export default PrivateRepositories;