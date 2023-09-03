import { Box } from "@chakra-ui/react"
import Navbar from "../NavBar/NavBar"
import React from "react"
import "./Header.css"

const Header = () => {
  return (
    <Box as="header">
      <Navbar></Navbar>
    </Box>
  )
}

export default Header
