"use client";

import { useState } from "react";
import {
  ButtonContainer,
  CancelButton,
  Container,
  Form,
  Input,
  Label,
  SaveButton,
  Textarea,
  Titulo,
} from "./comments.styles";

interface Props {
  createComment: boolean;
  onCancel: () => void;
}

export default function CreateComments({ createComment, onCancel }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCancel = () => {
    onCancel();
  };
  return (
    <Container>
      <Titulo>Nova nota:</Titulo>
      <Form>
        <Label>Titulo: </Label>
        <br />
        <Input type="text" />
        <Label>Conteúdo: </Label>
        <br />
        <Textarea></Textarea>
        <br />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <SaveButton>Salvar</SaveButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
