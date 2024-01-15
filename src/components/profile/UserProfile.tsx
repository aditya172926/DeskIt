import { Card, Row, Col } from "antd";

const UserProfile = () => {
  return (
    <Card hoverable style={{ marginTop: "10px" }}>
      <Row>
        <Col span={24}>Github User</Col>
      </Row>

      <Row>
        <Col span={6}>User image</Col>
        <Col span={18}>
          <Row>
            <Col span={24}>User Name</Col>
          </Row>
          <Row>
            <Col span={8}>
              <Row>
                <Col>Role</Col>
              </Row>
              <Row>
                <Col>Role Value</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col>Role</Col>
              </Row>
              <Row>
                <Col>Role Value</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col>Role</Col>
              </Row>
              <Row>
                <Col>Role Value</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
