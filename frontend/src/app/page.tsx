"use client";

import Navbar from "./components/(navbar)";
import { InicialPageContainer } from "./global.styles";
import dynamic from "next/dynamic";

const TravelHighlights = dynamic(
  () => import("./components/(travelHighlights)"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <InicialPageContainer>
      <Navbar />
      <TravelHighlights />
    </InicialPageContainer>
  );
}
