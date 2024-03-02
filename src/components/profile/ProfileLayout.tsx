import { invoke } from "@tauri-apps/api/tauri";
import { Avatar, Button, Col, Layout, Row, Typography } from "antd";
import DOMPurify from "dompurify";
import { useMemo, useState } from "react";
import { GithubUser, Nullable, UserType } from "../../types";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  user: Nullable<GithubUser>;
  userType: UserType;
}

const { Content, Sider } = Layout;
const { Paragraph } = Typography;

const ProfileLayout = ({ user, userType }: Props) => {
  const { token } = useAuthContext();
  const [userReadme, setUserReadme] = useState<any>(null);

  useMemo(() => {
    const getUserProfile = async (username: Nullable<string>) => {
      if (token) {
        try {
          if (user) {
            console.log("Fetching readme... for ", user);
            const readme: string = await invoke("call_api_method", {
              method: "GET",
              token: token,
              url: `https://api.github.com/repos/${username}/${username}/readme`,
              headers: { Accept: "application/vnd.github.html+json" },
            });
            const sanitized_readme = DOMPurify.sanitize(`${readme}`);
            setUserReadme(sanitized_readme);
          }
        } catch (error) {
          console.log("Error in fetching User Profile ", error);
        }
      }
    };
    getUserProfile(user?.login ? user?.login : null);
  }, [user?.name]);

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

          {userType == UserType.USER && (
            <Button style={{ marginTop: "10px" }} type="default" block>
              Follow
            </Button>
          )}

          <Row style={{ marginTop: "10px" }}>
            <Col span={12}>
              <Row>
                <Col>{user?.location}</Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Row>
                <Col>{user?.email}</Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Row>
                <Col>{user?.twitter_username}</Col>
              </Row>
            </Col>
          </Row>
        </Sider>
        <Content style={{ padding: "0 24px", overflow: "initial" }}>
          {/* sanitise the html before passing into this */}
          <div dangerouslySetInnerHTML={{ __html: userReadme }} />
        </Content>
      </Layout>
    </>
  );
};

export default ProfileLayout;
