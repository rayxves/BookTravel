import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const url = "http://localhost:5020/api/tourist-spot";

  try {
    const response = await axios.get(url);

    if (!response.data || !Array.isArray(response.data.results)) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    const places = response.data.results.map((place: any) => ({
      id: place?.Id || null,
      name: place?.Name || "Unnamed",
      description: place?.Description || "No description available",
      rating: place?.Rating || 0,
      imageUrl: place?.PhotoUrls?.[0] || null,
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
