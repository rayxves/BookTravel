import Image from "next/image";
import Navbar from "../(navbar)/page";
import {
  Container,
  Header,
  SubHeader,
  Paragraph,
  List,
  ListItem,
  
  ImageContainer,
  FooterContainer,
} from "./about.styles";
import journey from "../../assets/Journey-bro.png";

export default function About() {
  return (
    <>
      <Navbar />
      <Container>
        <Header>Bem-vindo ao Book Travel!</Header>
        <Paragraph>
          Sua plataforma para explorar e descobrir os destinos dos seus sonhos.
          Criado como parte de um projeto pessoal, o site é projetado para te
          ajudar a planejar viagens e organizar seus destinos favoritos com
          facilidade.
        </Paragraph>
        <SubHeader>Como funciona?</SubHeader>
        <List>
          <ListItem>
            Pesquise pelos seus destinos favoritos diretamente na nossa barra de
            pesquisa para obter informações sobre cada local.
          </ListItem>
          <ListItem>
            Faça login para personalizar sua experiência! Salve os locais que
            você mais gosta e tenha acesso rápido aos seus destinos favoritos.
          </ListItem>
          <ListItem>
            Ao encontrar um lugar que você gostaria de visitar, clique em
            adicionar aos favoritos. Assim, você pode voltar facilmente a ele
            sempre que precisar.
          </ListItem>
        </List>

        <FooterContainer>
          <Paragraph>
            Esse projeto foi desenvolvido com o objetivo de aprender e estudar
            sobre desenvolvimento web, explorando a construção de APIs,
            integração com front-end e aprimoramento de habilidades em design e
            usabilidade. A ideia foi criar uma plataforma funcional, onde é
            possível pesquisar, salvar e organizar destinos de viagem, enquanto
            praticamos tecnologias modernas. Desenvolvido com ♥.
          </Paragraph>
          <ImageContainer>
            <Image src={journey} style={{ objectFit: "contain" }} priority />
          </ImageContainer>
        </FooterContainer>
      </Container>
    </>
  );
}
