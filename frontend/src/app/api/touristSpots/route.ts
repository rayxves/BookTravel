import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("http://localhost:5020/api/tourist-spot");

  try {
    const response = await axios.get(url.toString());

    if (!response.data || !Array.isArray(response.data)) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    const places = response.data.map((place) => ({
      id: place?.id || null,
      name: place?.name || "Unnamed",
      description: place.description || "No description available",
      rating: place?.rating || 0,
      imageUrl: place?.photoUrls?.[0] || null,
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
