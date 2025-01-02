import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const url = new URL("http://localhost:5020/api/account/register");

    const response = await axios.post(url.toString(), {
      UserName: username,
      Email: email,
      Password: password,
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: `Erro ao registrar usuário: ${error.status}` },
      { status: 500 }
    );
  }
}
