import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL("http://localhost:5020/api/favorite");

  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Token not provided" },
        { status: 401 }
      );
    }

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}
