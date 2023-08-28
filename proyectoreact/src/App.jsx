import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
