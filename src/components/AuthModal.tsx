import { invoke } from "@tauri-apps/api/tauri";
import { Avatar, Button, Col, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { pollAuthApi } from "../services/commands";
import { GithubAuthCode, Nullable } from "../types";

interface Props {
  shouldShowModal: boolean;
  setToken: (param: string) => void;
  onCancel: () => void;
}

const AuthModal = ({ shouldShowModal, setToken, onCancel }: Props) => {
  const [authCode, setAuthCode] = useState<Nullable<GithubAuthCode>>(null);
  const { Title, Text } = Typography;

  const authenticate_with_github = async (): Promise<void> => {
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
          return null;
        }
        if (response?.access_token) {
          console.log("Response ", response); // successful authentication
          setToken(response.access_token);
          clearInterval(pollResponse);
        }
      }, 6000);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Modal centered footer={null} open={shouldShowModal} onCancel={onCancel}>
      <Row justify="center">
        <Col>
          <Title level={4}>Authenticate using Github</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: "5%" }}>
        <Col>
          <Avatar shape="square" size={50} src="../../app-icon.png" /> -------{" "}
          <Avatar shape="square" size={50} src="../../github-mark.png" />
        </Col>
      </Row>
      {authCode?.user_code ? (
        <>
          <Row justify="center">
            <Col>
              <Title level={4}>{authCode?.user_code}</Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Text>Paste the above code in the new window</Text>
            </Col>
          </Row>
        </>
      ) : (
        <Row justify="center" style={{ margin: "5%" }}>
          <Col span={24}>
            <Button onClick={() => authenticate_with_github()} block={true}>
              Sign In with GitHub
            </Button>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default AuthModal;
