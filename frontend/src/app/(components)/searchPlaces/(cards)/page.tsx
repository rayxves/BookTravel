import Card from "./(card)/page";
import { CardContainer } from "./searchCards.styles";

interface Props {
  isSearching: boolean;
  results: any[];
}

export default function Cards({ isSearching, results }: Props) {
  return (
    <>
      <CardContainer>
        {isSearching ? (
          <p>Buscando...</p>
        ) : results.length > 0 ? (
          results.map((place) => <Card key={place.id} place={place} />)
        ) : (
          <></>
        )}
      </CardContainer>
    </>
  );
}
