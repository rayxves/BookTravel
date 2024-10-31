"use client";

import Navbar from "./(components)/(navbar)/page";
import TravelHighlights from "./(components)/(travelHighlights)/page";
import { InicialPageContainer } from "./global.styles";

export default function Home() {
  return (
    <InicialPageContainer>
      <Navbar />
      <TravelHighlights />
    </InicialPageContainer>
  );
}
