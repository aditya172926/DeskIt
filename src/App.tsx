import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

const {Content} = Layout;

function App() {

  return (
    <Layout style={{minHeight: "100vh"}}>
      <NavBar />
      <Layout className="site-layout">
        <Content style={{background: "white"}}>
          <Outlet />
          <FloatButton.BackTop />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
