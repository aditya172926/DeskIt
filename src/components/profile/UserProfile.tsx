import { Card, Row, Col, Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { GithubUser, Nullable } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";

const UserProfile = () => {
  const [user, setUser] = useState<Nullable<GithubUser>>(null);

  useEffect(() => {
    const getUserProfile = async(username: string) => {
      try {
        // const user: GithubUser = await invoke("get_user_profile", {username: username});
        // console.log("The user profile is ", user);
        // setUser(user);
      } catch (error) {
        console.log("Error in fetching User Profile ", error);
      }
    }
    getUserProfile("aditya172926"); // hardcoded profile value
  }, [])

 

  return (
    <Card hoverable style={{ marginTop: "10px", boxShadow: "5px" }}>
      {/* <a href="https://github.com/login/device">Github authentication</a> */}

      <Row>
        <Col span={4}>
          <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 150, xl: 80, xxl: 100 }} src={user?.avatar_url} />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={24}><h2><b>{user?.name}</b></h2></Col>
          </Row>
          <Row>
            <Col span={24}><b>{user?.login}</b></Col>
          </Row>
          <Row>
            <Col span={8}>
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
