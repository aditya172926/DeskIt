import { SearchOutlined } from "@ant-design/icons";
import { invoke } from "@tauri-apps/api/tauri";
import { Col, Form, Input, message } from "antd";
import { useState } from "react";
import { getErrorMessage } from "../../helper";
import { Nullable, Repository } from "../../types";
import MasterDetail from "../MasterDetail";
import ModalInterface from "../ui/ModalInterface";
import { SearchInterface, SearchUIType } from "../ui/SearchInterface";
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
      setUsername(username);
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
      <ModalInterface
        title="Enter Github username"
        centered={true}
        okText="Done"
        cancelText="Cancel"
        open={shouldShowModal}
        onOk={onFormSubmit}
        onCancel={() => setShouldShowModal(false)}
        detailLayout={
          <Form
            form={form}
            name="username_form"
            initialValues={{ username: "" }}
          >
            <Form.Item
              name="username"
              label="username"
              rules={[
                {
                  required: true,
                  message: "Please provide your username",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Form>
        }
      />
    );
  };

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
      <SearchInterface
        type={SearchUIType.Button}
        icon={<SearchOutlined />}
        onClick={() => setShouldShowModal(true)}
      />
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
