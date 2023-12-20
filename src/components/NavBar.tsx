import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem("Public Actions", "sub1", <UnlockOutlined />, [
    getItem("Repositories", "g1", null, [
      getItem(<Link to={"repositories/public"}>View all repos</Link>, "1"),
    ]),
    getItem("Gists", "g2", null, [
      getItem(<Link to={"gists/public"}>View all gists</Link>, "3"),
    ]),
  ]),
  getItem("Private Actions", "sub2", <LockOutlined />, [
    getItem("Repositories", "g3", null, [
      getItem(<Link to={"repositories/private"}>View my repos</Link>, "5"),
    ]),
    getItem("Gists", "g4", null, [
      getItem(<Link to={"gists/private"}>View my gists</Link>, "6"),
      getItem(<Link to={"gist/new"}>Create new gist</Link>, "7"),
    ]),
  ]),
];

const NavBar = () => {
  return (
    <Layout.Header style={{ background: "while" }}>
      <div
        className="logo"
        style={{ float: "left", marginRight: "200px", padding: "1%" }}
      >
        <Link to="/">
          <img src="./tauri.svg" alt="Tauri logo" style={{ width: "40px" }} />
        </Link>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="horizontal"
        items={items}
        style={{ position: "relative" }}
      />
    </Layout.Header>
  );
};

export default NavBar;