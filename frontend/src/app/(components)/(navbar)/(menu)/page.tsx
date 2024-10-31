import Link from "next/link"; // Importando Link do Next.js

import { MenuContainer, MenuIcons, MenuItem } from "./menu.styles";
import {
  faHouse,
  faLocationDot,
  faUsers,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

interface props {
  isVisible: boolean;
}

export default function Menu({ isVisible }: props) {
  return (
    <>
      <MenuContainer className={isVisible ? "visible" : ""}>
        <MenuItem>
          <MenuIcons icon={faHouse} />
          <Link href="./">Home</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faLocationDot} />
          <Link href="/searchPlaces">Procurar Destinos</Link>
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
