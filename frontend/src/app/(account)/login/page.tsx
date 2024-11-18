"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/app/(components)/(navbar)/page";
import {
  AccountContainer,
  FormContainer,
  Title,
  Form,
  Label,
  Input,
  Button,
  Text,
  TextContainer,
} from "./login.styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(authContext)/authContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Nome de usuário é obrigatório!";
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória!";
    }

    setErrors(newErrors);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(username);
        router.push("/");
      } else {
        console.error("Erro ao logar:", data.error);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  return (
    <>
      <Navbar />
      <AccountContainer>
        <FormContainer>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Nome de usuário:</Label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <Text>{errors.username}</Text>}

            <Label>Senha:</Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <Text>{errors.password}</Text>}

            <Button type="submit">Enviar</Button>
          </Form>

          <TextContainer>
            <Text>Ainda não tem uma conta? </Text>
            <Link href="./register">Cadastrar</Link>
          </TextContainer>
        </FormContainer>
      </AccountContainer>
    </>
  );
}
