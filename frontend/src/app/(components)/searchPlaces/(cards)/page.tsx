import Spinner from "../../(spinner)/page";
import Card from "./(card)/page";
import { CardContainer, SpinnerContainer } from "./searchCards.styles";

interface Props {
  isSearching: boolean;
  results: any[];
}

export default function Cards({ isSearching, results }: Props) {
  return (
    <>
      <CardContainer>
        {isSearching ? (
          <SpinnerContainer>
          <Spinner loading={isSearching} />
        </SpinnerContainer>
        ) : results.length > 0 ? (
          results.map((place) => <Card key={place.id} place={place} />)
        ) : (
          <></>
        )}
      </CardContainer>
    </>
  );
}
