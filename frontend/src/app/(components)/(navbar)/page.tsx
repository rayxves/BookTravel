import Link from "next/link"; // Importando Link do Next.js
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
} from "./navbar.styles";
import { useState } from "react";
import Menu from "../(menu)/page";

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
        <UserIcon icon={faUser} />

        <AccountLinks>
          <Link className="login" href="/login">
            Login
          </Link>
          <Link href="/register">Cadastrar</Link>
        </AccountLinks>
      </NavbarContainer>

      {menuOpen && <Menu isVisible={menuOpen} />}
    </>
  );
}
