import { Button } from "@chakra-ui/react";
import "./NavAbout.css";
import { NavLink } from "react-router-dom";

const NavAbout = () => {
  return (
    <nav>
      <NavLink to="/about">
        <Button>About</Button>
      </NavLink>
    </nav>
  );
};

export default NavAbout;
