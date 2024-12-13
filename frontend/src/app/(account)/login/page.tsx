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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { username: "", password: "" };

    if (!username.trim()) newErrors.username = "Nome de usuário é obrigatório!";
    if (!password.trim()) newErrors.password = "Senha é obrigatória!";

    setErrors(newErrors);
    if (newErrors.username || newErrors.password) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        login(username, token);
        router.push("/");
      } else {
        setErrors({ username: "", password: data.error || "Erro ao logar." });
      }
    } catch (error) {
      setErrors({ username: "", password: "Erro ao se conectar ao servidor." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AccountContainer>
        <FormContainer>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">Nome de usuário:</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Nome de usuário"
            />
            {errors.username && <Text>{errors.username}</Text>}

            <Label htmlFor="password">Senha:</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Senha"
            />
            {errors.password && <Text>{errors.password}</Text>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
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
