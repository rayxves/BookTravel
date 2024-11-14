"use client";

import { useState } from "react";
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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Nome de usuário é obrigatório!";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória!";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Login válido!");
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
