import {
  AviaoImageContainer,
  MundoImageContainer,
  PageContainer,
  SubTitle,
  Title,
  TravelsContainer,
} from "./travels.styles";
import aviao from "../../assets/aviao.png";
import mundo from "../../assets/mundo.png";
import Image from "next/image";

export default function TravelHighlights() {
  return (
    <PageContainer>
      <AviaoImageContainer>
        <Image src={aviao} alt="" />
        <Title>Planeje sua próxima viagem.</Title>
      </AviaoImageContainer>

      <TravelsContainer></TravelsContainer>

      <MundoImageContainer>
        <SubTitle>Descubra novos destinos!</SubTitle>
        <Image src={mundo} alt="" />
      </MundoImageContainer>
    </PageContainer>
  );
}
