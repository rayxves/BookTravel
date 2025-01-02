"use client";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "@/app/(components)/(navbar)/page";
import {
  AccountContainer,
  FormContainer,
  Title,
  Label,
  Form,
  Input,
  Button,
  Text,
  TextContainer,
} from "./registro.style";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Nome de usuário é obrigatório!")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres!"),
  email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
  password: Yup.string()
    .required("Senha é obrigatória!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .matches(/\d/, "A senha deve conter pelo menos um número!")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A senha deve conter pelo menos um caractere especial!"
    )
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula!"),
});

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log("Valores do formulário:", values);
    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        alert(data.error || "Erro ao registrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      alert("Erro ao fazer a requisição.");
    }
  };

  return (
    <>
      <Navbar />
      <AccountContainer>
        <FormContainer>
          <Title>Cadastrar</Title>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Label>Nome de usuário:</Label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  as={Input}
                  value={values.username}
                  onChange={handleChange}
                />
                <ErrorMessage name="username" component={Text} />

                <Label>Email:</Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  as={Input}
                  value={values.email}
                  onChange={handleChange}
                />
                <ErrorMessage name="email" component={Text} />

                <Label>Senha:</Label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  as={Input}
                  value={values.password}
                  onChange={handleChange}
                />
                <ErrorMessage name="password" component={Text} />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </Form>
            )}
          </Formik>

          <TextContainer>
            <Text>Já tem uma conta? </Text>
            <Link href="./login">Logar</Link>
          </TextContainer>
        </FormContainer>
      </AccountContainer>
    </>
  );
}
