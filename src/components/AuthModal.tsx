import { Avatar, Button, Col, Modal, Row, Typography } from "antd";
import { GithubAuthCode, Nullable } from "../types";

interface Props {
  shouldShowModal: boolean;
  onSubmit: () => void;
  authCode: Nullable<GithubAuthCode>;
  onCancel: () => void;
}

const AuthModal = ({ shouldShowModal, onSubmit, authCode, onCancel }: Props) => {
  const { Title, Text } = Typography;

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
            <Button onClick={() => onSubmit()} block={true}>
              Sign In with GitHub
            </Button>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default AuthModal;
