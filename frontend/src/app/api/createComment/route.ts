import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { TouristSpotName, content } = await request.json();
    const url = new URL("http://localhost:5020/api/comment");
    const token = request.headers.get("authorization")?.replace("Bearer ", "");


    const response = await axios.post(
      url.toString(),
      {
        TouristSpotName,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao criar um comentário:", error);
    return NextResponse.json(
      { error: "Erro ao criar um comentário." },
      { status: 500 }
    );
  }
}
