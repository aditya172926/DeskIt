import { useEffect, useState } from "react";
import { Col, message, Modal, Form, Input } from "antd";
import { Nullable, Repository } from "../../types";
import RepositoryDetails from "./RepositoryDetails";
import MasterDetail from "../MasterDetail";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";


const PublicUserRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [username, setUsername] = useState<Nullable<string>>(null);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const getUserPublicRepositories = async (username: string) => {
    try {
      const repositories: Repository[] = await invoke(
        "get_public_repositories_for_user",
        {
          username: username,
        }
      );
      console.log("User Public repos ", repositories);
      setRepositories(repositories);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: getErrorMessage(error),
      });
    }
  };

  const onFormSubmit = () => {
    form.validateFields().then((values: any) => {
        setUsername(values.username)
        getUserPublicRepositories(values.username);
    });
  };

  const usernameModal = () => {
    return (
        <Modal title="Enter Github username"
        centered
        okText="Done"
        cancelText="Cancel"
        open={shouldShowModal}
        onOk={onFormSubmit}>
            <Form form={form} name="username_form" initialValues={{username: ""}}>
                <Form.Item name="username" label="username" rules={[
                    {
                        required: true,
                        message: "Please provide your username"
                    }
                ]}>
                    <Input placeholder="Username" />
                </Form.Item>
            </Form>
        </Modal>
    )
  }

  const title = username ? `${username} public repositories` : "";
  const getItemDescription = (repository: Repository) => repository.name;
  const detailLayout = (repository: Nullable<Repository>) => {
    if (!repository) return null;
    return (
      <Col span={18}>
        <RepositoryDetails repository={repository} />
      </Col>
    );
  };

  return (
    <>
      {contextHolder}
      {usernameModal}
      <MasterDetail
        title={title}
        items={repositories}
        getItemDescription={getItemDescription}
        detailLayout={detailLayout}
      />
    </>
  );
};

export default PublicUserRepositories;