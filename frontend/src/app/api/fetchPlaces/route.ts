import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { error: "Query parameter is required and must be a string" },
      { status: 400 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent( query)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      return NextResponse.json(
        { error: response.data.error_message || "Google API error" },
        { status: 500 }
      );
    }

    const places = response.data.results.slice(0, 6).map((place: any) => ({
      id: place.place_id,
      name: place.name,
      description: place.formatted_address,
      rating: place.rating,
      imageUrl: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : null,
    }));

    return NextResponse.json(places);
  } catch (error: any) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}