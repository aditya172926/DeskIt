import { useEffect, useState } from "react";
import GistDetails from "./GistDetails";
import MasterDetail from "../MasterDetail";
import { Gist, Nullable } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";

const PublicGists = () => {
  const [gists, setGists] = useState<Gist[]>([]);

  useEffect(() => {
    const getGists = async () => {
      try {
        const gists: Gist[] = await invoke("get_public_gists");
        setGists(gists);
      } catch (error) {
        
      }
    };
    getGists();
  }, []);

  const title = "Public Gists";
  const getItemDescription = (gist: Gist) =>
    gist.description || "No description provided";
  const detailLayout = (gist: Nullable<Gist>) => {
    if (!gist) return null;
    return (
        <GistDetails gist={gist} />
    );
  };

  return (
    <>
      <MasterDetail
        title={title}
        items={gists}
        getItemDescription={getItemDescription}
        detailLayout={detailLayout}
      />
    </>
  );
};

export default PublicGists;