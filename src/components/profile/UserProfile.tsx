import { Card, Row, Col, Avatar } from "antd";
import { useEffect, useState } from "react";
import { GithubUser, Nullable } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";

const UserProfile = () => {
  const [user, setUser] = useState<Nullable<GithubUser>>(null);

  useEffect(() => {
    const getUserProfile = async(username: string) => {
      try {
        const user: GithubUser = await invoke("get_user_profile", {username: username});
        console.log("The user profile is ", user);
        setUser(user);
      } catch (error) {
        console.log("Error in fetching User Profile ", error);

      }
    }
    getUserProfile("aditya172926"); // hardcoded profile value
  }, [])

  return (
    <Card hoverable style={{ marginTop: "10px" }}>
      <Row>
        <Col span={24}>Github User</Col>
      </Row>

      <Row>
        <Col span={6}><Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={user?.avatar_url} /></Col>
        <Col span={18}>
          <Row>
            <Col span={24}>{user?.login}</Col>
          </Row>
          <Row>
            <Col span={8}>
              <Row>
                <Col>Bio</Col>
              </Row>
              <Row>
                <Col>{user?.bio}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col>Followers</Col>
              </Row>
              <Row>
                <Col>{user?.followers}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col>Following</Col>
              </Row>
              <Row>
                <Col>{user?.following}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
