import { Box } from "@chakra-ui/react";
import NavAbout from "../NavAbout/NavAbout";
import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <Box as="footer">
      <NavAbout></NavAbout>
    </Box>
  );
};

export default Footer;
