"use client";

import Navbar from "@/app/components/(navbar)";
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
import { useAuth } from "@/app/authContext/authContext";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Nome de usuário é obrigatório!")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres!"),
  password: Yup.string().required("Senha é obrigatória!"),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const { username, password } = values;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();
      if (response.ok && response.status === 200) {
        const token = data.token;
        login(username, token);
        router.push("/");
      } else {
        alert(data.error || "Erro ao logar.");
      }
    } catch (error) {
      alert(`Erro ao se conectar ao servidor: ${error}`);
    }
  };

  return (
    <>
      <Navbar />
      <AccountContainer>
        <FormContainer>
          <Title>Login</Title>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Label htmlFor="username">Nome de usuário:</Label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  required
                  as={Input}
                />
                <ErrorMessage name="username" component={Text} />

                <Label htmlFor="password">Senha:</Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  required
                  as={Input}
                />
                <ErrorMessage name="password" component={Text} />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </Form>
            )}
          </Formik>

          <TextContainer>
            <Text>Ainda não tem uma conta? </Text>
            <Link href="./register">Cadastrar</Link>
          </TextContainer>
        </FormContainer>
      </AccountContainer>
    </>
  );
}
