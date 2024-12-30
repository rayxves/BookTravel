import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = "http://localhost:5020/api/comment/by-user";
  const urlParams = new URL(request.url).searchParams;

  const placeName = urlParams.get("placeName") || null;
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        placeName: placeName,  
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }
    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
