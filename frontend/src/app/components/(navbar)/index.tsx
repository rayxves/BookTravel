"use client";

import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Logo,
  NavbarContainer,
  AccountLinks,
  MenuIcon,
  UserIcon,
  Button,
  IconLink,
} from "./navbar.styles";
import { useState } from "react";
import Menu from "./(menu)";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <NavbarContainer>
        <Button onClick={toggleMenu}>
          <MenuIcon icon={faBars} />
        </Button>

        <Logo>
          <Image src={logo} alt="Logo" />
        </Logo>

        <IconLink href="/account/login">
          <UserIcon icon={faUser} />
        </IconLink>

        <AccountLinks>
          <Link className="login" href="/account/login">
            Login
          </Link>
          <Link href="/account/register">Cadastrar</Link>
        </AccountLinks>
      </NavbarContainer>

      {menuOpen && <Menu isVisible={menuOpen} />}
    </>
  );
}
