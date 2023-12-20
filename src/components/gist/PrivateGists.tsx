import { useEffect, useState } from "react";
import GistDetails from "./GistDetails";
import MasterDetail from "../MasterDetail";
import { Col, message } from "antd";
import { Gist, Nullable } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";
import { useAuthContext } from "../context/AuthContext";

const PrivateGists = () => {
  const [gists, setGists] = useState<Gist[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useAuthContext();

  useEffect(() => {
    const getGists = async () => {
      if (token) {
        try {
          const gists: Gist[] = await invoke(
            "get_gists_for_authenticated_user",
            { token }
          );
          setGists(gists);
        } catch (error) {
          messageApi.open({
            type: "error",
            content: getErrorMessage(error),
          });
        }
      }
    };
    getGists();
  }, [token]);

  const title = "Private Gists";
  const getItemDescription = (gist: Gist) => gist.description;
  const detailLayout = (gist: Nullable<Gist>) => {
    if (!gist) return null;
    return (
      <Col span={18}>
        <GistDetails gist={gist} />
      </Col>
    );
  };

  return (
    <>
      {contextHolder}
      <MasterDetail
        title={title}
        getItemDescription={getItemDescription}
        detailLayout={detailLayout}
        items={gists}
      />
    </>
  );
};
