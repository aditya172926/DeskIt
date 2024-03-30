import { ConfigProvider, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

const { Content } = Layout;

function App() {

  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm
    }}>
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar />
        <Layout className="site-layout">
          <Content>
            <Outlet />
            {/* <FloatButton.BackTop /> */}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App;
