import logo from "../../assets/logo.png";
import Image from "next/image";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Logo,
  NavbarContainer,
  StyledIcon,
  AccountLinks,
  NavLinks,
} from "./navbar.styles";

export default function Navbar() {
  return (
    <>
      <NavbarContainer>
        <StyledIcon icon={faBars} />
        <NavLinks>
          {/* <a href="/about">Sobre nós</a> */}
          <a href="/home">Home</a>
          <a href="/search">Procurar Destinos</a>
          {/* <a href="/userPage">Página do usúario</a> */}
        </NavLinks>
        <Logo>
          <Image src={logo} alt="Logo" />
        </Logo>
        <StyledIcon icon={faUser} />

        <AccountLinks>
          <a className="login" href="/login">
            Login
          </a>
          <a href="/register">Cadastrar</a>
        </AccountLinks>
      </NavbarContainer>
    </>
  );
}
