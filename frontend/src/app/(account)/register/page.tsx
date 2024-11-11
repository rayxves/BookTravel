"use client";

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
  TextContainer
} from "./registro.style";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Navbar />
      <AccountContainer>
        <FormContainer>
          <Title>Cadastrar</Title>
          <Form action="./">
            <Label>Nome de usuário:</Label>
            <Input type="text" placeholder="Username" />

            <Label>Email:</Label>
            <Input type="email" placeholder="Email" />

            <Label>Senha:</Label>
            <Input type="password" placeholder="Password" />
          </Form>
          <Button>Enviar</Button>
          <TextContainer>
            {" "}
            <Text>Já tem uma conta? </Text>
            <Link href="./login">Logar</Link>
          </TextContainer>
        </FormContainer>
      </AccountContainer>
    </>
  );
}
