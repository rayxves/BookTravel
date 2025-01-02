import { useState } from "react";
import {
  ButtonContainer,
  CancelButton,
  Container,
  Form,
  Label,
  SaveButton,
  Textarea,
  Titulo,
} from "./createComments.styles";
import axios from "axios";

interface Props {
  onCancel: () => void;
  name: string;
}

export async function handleSave(TouristSpotName: string, content: string) {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      "/api/createComment",
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
  } catch (error) {
    console.error("Erro ao salvar comentário:", error);
    throw new Error("Não foi possível salvar o comentário.");
  }
}

export default function CreateComments({ onCancel, name }: Props) {
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveClick = async () => {
    if (!query.trim()) {
      alert("O conteúdo do comentário não pode estar vazio.");
      return;
    }

    if (query.length > 250) {
      alert("O comentário não pode ter mais de 250 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await handleSave(name, query);
      setSuccess("Comentário salvo com sucesso!");
      setQuery("");
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error: any) {
      setSuccess("Erro ao salvar o comentário: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Titulo>Nova nota:</Titulo>
      <Form>
        <Label>Conteúdo: </Label>
        <br />
        <Textarea
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          maxLength={250}
        ></Textarea>
        <p
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            height: "1.5rem",
            fontSize: "0.8rem",
            color: "gray",
            padding: "0.2rem",
          }}
        >
          Tamanho máximo: 250 caracteres.
        </p>

        <ButtonContainer>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <SaveButton onClick={handleSaveClick} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </SaveButton>
        </ButtonContainer>
      </Form>
      {success && (
        <p
          style={{
            display: "flex",
            justifyContent: "start",
            fontFamily: "Inter",
            alignItems: "end",
            height: "1.5rem",
            fontSize: "0.8rem",
            color: "black",
            padding: "0.2rem",
          }}
        >
          {success}
        </p>
      )}
    </Container>
  );
}
