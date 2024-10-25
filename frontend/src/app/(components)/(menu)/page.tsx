import { MenuContainer, MenuItem } from "./menu.styles";

export default function Menu() {
  return (
    <>
      <MenuContainer>
        <MenuItem>
          <a href="/about">Sobre nós</a>
        </MenuItem>
        <MenuItem>
          <a href="/home">Home</a>
        </MenuItem>
        <MenuItem>
          <a href="/search">Procurar Destinos</a>
        </MenuItem>
        <MenuItem>
          {" "}
          <a href="/userPage">Página do usúario</a>
        </MenuItem>
      </MenuContainer>
    </>
  );
}
