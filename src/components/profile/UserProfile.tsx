import { invoke } from "@tauri-apps/api/tauri";
import { useMemo, useState } from "react";
import { GithubUser, Nullable } from "../../types";
import { useAuthContext } from "../context/AuthContext";
import { Avatar, Card, Col, Row, Layout, Button, Typography } from "antd";

const { Content, Sider } = Layout;
const { Text, Paragraph } = Typography;

const UserProfile = () => {
  // const [user, setUser] = useState<Nullable<GithubUser>>(null);
  const { token, user, setUserProfile } = useAuthContext();

  useMemo(() => {
    const getUserProfile = async (username: string) => {
      console.log("calling getUserProfile");
      if (token) {
        try {
          console.log("Auth token ", token);
          const user: GithubUser = await invoke("get_user_profile", {
            username: username,
          });
          console.log("The user profile is ", user);
          setUserProfile(user);
        } catch (error) {
          console.log("Error in fetching User Profile ", error);
        }
      }
      getUserProfile("aditya172926"); // hardcoded profile value
    };
  }, [token]);

  return (
    <>
      <Layout>
        <Sider
          style={{
            background: "lightgray",
            borderRight: "1px solid gray",
            padding: "1%",
          }}
          width={250}
        >
          <Row>
            <Col>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 200, xl: 210, xxl: 230 }}
                src={user?.avatar_url}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Row>
                <Col span={24}>
                  <h2>
                    <b>{user?.name}</b>
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <b>{user?.login}</b>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Paragraph>{user?.bio}</Paragraph>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Row>
                <Col>Followers - {user?.followers}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col>Following - {user?.following}</Col>
              </Row>
            </Col>
          </Row>

          <Button type="default" block>
            Follow
          </Button>
        </Sider>

        <Content style={{ padding: "0 24px", overflow: "initial" }}>
          Content
        </Content>
      </Layout>
      {/* <Row style={{height: "100%"}}>
        <Col span={6} style={{margin: "1%", borderRight: "10px solid gray", height: "100%"}}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 150, xl: 80, xxl: 100 }}
            src={user?.avatar_url}
          />
        </Col>
        <Col style={{height: "100%"}}>
          1Content
          1Content
          1Content
          1Content
          1Content

        </Col>
      </Row> */}

      {/* <Card hoverable style={{ marginTop: "10px", boxShadow: "5px" }}>
        <Row>
          <Col span={4}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 150, xl: 80, xxl: 100 }}
              src={user?.avatar_url}
            />
          </Col>
          <Col span={20}>
            <Row>
              <Col span={24}>
                <h2>
                  <b>{user?.name}</b>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <b>{user?.login}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Row>
                  <Col>{user?.bio}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Row>
                  <Col>Followers - {user?.followers}</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row>
                  <Col>Following - {user?.following}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card> */}
    </>
  );
};

export default UserProfile;
