import { SearchOutlined } from "@ant-design/icons";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, Col, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { getErrorMessage } from "../../helper";
import { Nullable, Repository } from "../../types";
import MasterDetail from "../MasterDetail";
import RepositoryDetails from "./RepositoryDetails";


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
      setUsername(username)
      setShouldShowModal(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: getErrorMessage(error),
      });
    }
  };

  const onFormSubmit = () => {
    form.validateFields().then((values: any) => {
        getUserPublicRepositories(values.username);
    });
  };

  const UsernameModal = () => {
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
      <UsernameModal />
      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => setShouldShowModal(true)} />
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