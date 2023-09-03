import { ChakraProvider } from "@chakra-ui/react"
import "./App.css"
import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import { AuthContextProvider } from "./context/authContext"

const App = () => {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </ChakraProvider>
    </AuthContextProvider>
  )
}

export default App
