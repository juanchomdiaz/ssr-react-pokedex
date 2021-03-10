import React from "react";
import { Navbar } from "react-bootstrap";

import "./Header.module.scss";
import LanguageSelector from "@components/common/ui/LanguageSelector";

const Header = () => {
  return (
    <Navbar bg="light" variant="light" className="justify-content-between">
      <a href="/">
        <Navbar.Brand>
          <img alt="Pokedex React" src="/images/svg/logo.svg" width="40" height="40" className="logo" />{" "}
          <div className="brand-name">SSR Pokedex</div>
        </Navbar.Brand>
      </a>
      <LanguageSelector />
    </Navbar>
  );
};

export default Header;
