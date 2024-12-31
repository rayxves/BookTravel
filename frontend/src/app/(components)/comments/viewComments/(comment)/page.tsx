import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CommentContent,
  CommentItem,
  Content,
  StyledDate,
  DateContainer,
  IconsContainer,
} from "./comment.styles";
import axios from "axios";
import { useAuth } from "@/app/(authContext)/authContext";
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
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    throw new Error("Erro ao deletar o comentário");
  }
}

export default function Comment({ comment }: { comment: CommentType }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
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
        setError("Falha ao excluir o comentário. Por favor, tente novamente.");
      }
    } catch (error) {
      setMessage("");
      setError("Falha ao excluir o comentário. Por favor, tente novamente.");
      console.log(error);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <CommentItem>
      <CommentContent>
        <DateContainer>
          <StyledDate>{formattedDate}</StyledDate>
          <IconsContainer>
          <button>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </IconsContainer>
        </DateContainer>
        <Content>{comment.content}</Content>
      </CommentContent>
      {message && <p style={{ color: "black", height: "1.5rem" }}>{message}</p>}
      {error && <p style={{ color: "red", height: "1.5rem" }}>{error}</p>}
    </CommentItem>
  );
}
