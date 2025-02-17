import dynamic from "next/dynamic";
import Card from "./(card)";
import { CardContainer, SpinnerContainer } from "./searchCards.styles";

interface Props {
  isSearching: boolean;
  results: any[];
}

const Spinner = dynamic(() => import("../../(spinner)"), { ssr: false });
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
