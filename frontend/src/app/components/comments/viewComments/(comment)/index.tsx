"use client";

import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CommentContent,
  CommentItem,
  Content,
  StyledDate,
  DateContainer,
  IconsContainer,
  TextareaContent,
  Message,
} from "./comment.styles";
import axios from "axios";
import { useAuth } from "@/app/authContext/authContext";
import { useState } from "react";

interface CommentType {
  id: number;
  content: string;
  createdOn: string;
  createdBy: string;
  touristSpotId: number;
  placeTypeId: number | null;
}

async function deleteComment(id: number, token: string) {
  if (!token) {
    throw new Error("Token not available");
  }

  try {
    const response = await axios.delete(
      `http://localhost:5020/api/comment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return "Comentário excluído com sucesso";
    } else {
      console.log("Falha ao excluir comentário", response.status);
      return null;
    }
  } catch (error: any) {
    console.error("Erro ao deletar comentário:", error);
    throw new Error(error.status);
  }
}

async function updateComment(token: string, id: number, content: string) {
  if (!token) {
    throw new Error("Token not available");
  }

  try {
    const response = await axios.put(
      `http://localhost:5020/api/comment/${id}`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error("Erro ao atualizar comentário:", error);
    throw new Error(error.status);
  }
}

export default function Comment({ comment }: { comment: CommentType }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [query, setQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { token } = useAuth();

  const dateObj = new Date(comment.createdOn);
  const formattedDate = dateObj.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleDelete = async () => {
    try {
      if (!token) {
        return null;
      }

      const resultMessage = await deleteComment(comment.id, token);

      if (resultMessage) {
        setMessage(resultMessage);
        setError("");
        setIsDeleted(true);
      } else {
        setMessage("");
        setError("Falha ao excluir o comentário.");
      }
    } catch (error) {
      setMessage("");
      setError(`Falha ao excluir o comentário: ${error}`);
      console.log(error);
    }
  };

  if (isDeleted) {
    return null;
  }

  const handleUpdate = async () => {
    if (!query.trim()) {
      alert("O conteúdo do comentário não pode estar vazio.");
      return;
    }
    try {
      if (!token) {
        return null;
      }

      await updateComment(token, comment.id, query);
      setIsUpdating(false);
      comment.content = query;
    } catch (error: any) {
      console.log("Falha ao atualizar o comentario: ", error);
      setError(`Falha ao atualizar comentário, ${error}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdate();
    }
  };

  return (
    <CommentItem>
      <CommentContent>
        <DateContainer>
          <StyledDate>{formattedDate}</StyledDate>
          <IconsContainer>
            <button onClick={() => setIsUpdating(!isUpdating)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </IconsContainer>
        </DateContainer>
        {isUpdating ? (
          <>
            <Message> Digite um novo comentário: </Message>

            <TextareaContent
              placeholder="Escreva aqui..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            ></TextareaContent>
          </>
        ) : (
          <Content>{comment.content}</Content>
        )}
      </CommentContent>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
    </CommentItem>
  );
}
