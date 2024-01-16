import { Card, Row, Col } from "antd";
import { useEffect } from "react";
import { GithubUser } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";
import { useAppContext } from "../context/AppContext";

const UserProfile = () => {
  const {user, setUser} = useAppContext();

  useEffect(() => {
    const getUserProfile = async(username: string) => {
      try {
        const user: GithubUser = await invoke("get_user_profile", {username: username});
        setUser(user);
      } catch (error) {
        console.log("Error in fetching User Profile ", error);

      }
    }
    getUserProfile();
  }, [])

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
