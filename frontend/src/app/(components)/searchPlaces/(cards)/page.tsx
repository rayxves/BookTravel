import { Button, Card, CardContainer, Description, Titulo } from "./searchCards.styles";

export default function Cards() {
  return (
    <>
      <CardContainer>
        <Card>
          <Titulo>Ver Favoritos</Titulo>
          <Description>Confira todos os seus destinos salvos. </Description>
          <Button>Ver Favoritos</Button>
        </Card>
     
      </CardContainer>
    </>
  );
}
