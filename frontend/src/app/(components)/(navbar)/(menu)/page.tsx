import Link from "next/link"; // Importando Link do Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuContainer, MenuIcons, MenuItem } from "./menu.styles";
import {
  faHouse,
  faLocationDot,
  faUsers,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

export default function Menu({ isVisible }) {
  return (
    <>
      <MenuContainer className={isVisible ? "visible" : ""}>
        <MenuItem>
          <MenuIcons icon={faHouse} />
          <Link href="/home">Home</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faLocationDot} />
          <Link href="/search">Procurar Destinos</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faUsers} />
          <Link href="/userPage">Página do Usuário</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faRocket} />
          <Link href="/about">Sobre Nós</Link>
        </MenuItem>
      </MenuContainer>
    </>
  );
}
