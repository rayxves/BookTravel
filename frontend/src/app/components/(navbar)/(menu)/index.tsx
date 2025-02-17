import Link from "next/link"; // Importando Link do Next.js

import { MenuContainer, MenuIcons, MenuItem } from "./menu.styles";
import {
  faHouse,
  faLocationDot,
  faHeart,
  faRocket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/app/authContext/authContext";

interface props {
  isVisible: boolean;
}

export default function Menu({ isVisible }: props) {
  const { logout } = useAuth();
  return (
    <>
      <MenuContainer className={isVisible ? "visible" : ""}>
        <MenuItem>
          <MenuIcons icon={faHouse} />
          <Link href="../">Home</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faLocationDot} />
          <Link href="/components/searchPlaces">Procurar Destinos</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faHeart} />
          <Link href="/components/favorites">Meus favoritos</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faRocket} />
          <Link href="/components/about">Sobre</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcons icon={faRightFromBracket} />
          <Link href="../" onClick={logout}>
            Logout
          </Link>
        </MenuItem>
      </MenuContainer>
    </>
  );
}
