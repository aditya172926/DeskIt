import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";


function App() {

  return (
    <ChakraProvider>
      <NavBar />
      <Outlet />
      {/* <FloatButton.BackTop /> */}
    </ChakraProvider>
  )
}

export default App;
