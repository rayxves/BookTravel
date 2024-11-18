import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const url = new URL("http://localhost:5020/api/account/login");

    const response = await axios.post(url.toString(), {
      UserName: username,
      Password: password,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao logar usuário." },
      { status: 500 }
    );
  }
}
