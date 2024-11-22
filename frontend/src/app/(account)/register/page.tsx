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
} from "./registro.style";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { username: "", email: "", password: "" };

    if (!username) {
      newErrors.username = "Nome de usuário é obrigatório!";
    }
    if (!email) {
      newErrors.email = "Email é obrigatório!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido!";
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória!";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres!";
    }

    setErrors(newErrors);

    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/");
      } else {
        console.error("Erro ao registrar:", data.error);
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
          <Title>Cadastrar</Title>
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

            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <Text>{errors.email}</Text>}

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
            <Text>Já tem uma conta? </Text>
            <Link href="./login">Logar</Link>
          </TextContainer>
        </FormContainer>
      </AccountContainer>
    </>
  );
}
