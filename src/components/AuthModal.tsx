import { invoke } from "@tauri-apps/api/tauri";
import { Avatar, Button, Col, Modal, Row, Typography } from "antd";

interface Props {
  shouldShowModal: boolean;
  onSubmit: (token: string) => void;
  onCancel: () => void;
}

const AuthModal = ({ shouldShowModal, onSubmit, onCancel }: Props) => {
  const { Title } = Typography;

  const newWindow = async () => {
    try {
      const response = await invoke("call_api_method", {method: "POST", url: "https://github.com/login/device/code?client_id=", data: {
        "key1": "value1",
        "key2": "value2"
      }})
    console.log("Fetch response", response);
      // await invoke("generate_new_window", {
      //   url: "https://github.com/login/device",
      //   label: "Authentication",
      //   title: "GitHub Auth",
      // });
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
      <Row justify="center" style={{margin: "5%"}}>
        <Col>
          <Avatar shape="square" size={50} src="../../app-icon.png" /> -------{" "}
          <Avatar shape="square" size={50} src="../../github-mark.png" />
        </Col>
      </Row>
      <Row justify="center" style={{margin: "5%"}}>
        <Col span={24}>
          <Button onClick={() => newWindow()} block={true}>
            Sign In with GitHub
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default AuthModal;
