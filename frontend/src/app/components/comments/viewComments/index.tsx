"use client";

import { useAuth } from "@/app/authContext/authContext";
import Comment from "./(comment)";
import {
  Button,
  Container,
  CreatedBy,
  ListContainer,
  Titulo,
} from "./viewComments.styles";

import axios from "axios";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

interface CommentType {
  id: number;
  createdOn: string;
  content: string;
  createdBy: string;
  touristSpotId: number;
  placeTypeId: number;
}

export default function ViewComments({
  onClose,
  placeName,
}: {
  onClose: () => void;
  placeName: string;
}) {
  const { username, token } = useAuth();
  const [comment, setComment] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      const comments = await fetchCommentsByUser(token, placeName);
      if (comments == null) {
      } else {
        setComment(comments);
      }
    };
    fetchData();
  }, [token, placeName]);

  return (
    <Container>
      <Button onClick={onClose}>X</Button>
      <Titulo>Minhas notas</Titulo>

      <ListContainer>
        <CreatedBy>created by: {username}</CreatedBy>
        {comment.length > 0 ? (
          <>
            {comment.map((note) => {
              return <Comment key={note.id} comment={note} />;
            })}
          </>
        ) : (
          <p
            style={{
              color: "black",
              height: "1.5rem",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
            }}
          >
            Não há comentários para exibir.
          </p>
        )}
      </ListContainer>
    </Container>
  );
}
async function fetchCommentsByUser(token: string, placeName: string) {
  if (!token) {
    return NextResponse.json({ error: "Token not provided" }, { status: 401 });
  }
  try {
    let url = "/api/getCommentsByUser";
    if (placeName) {
      url = `${url}?placeName=${encodeURIComponent(placeName)}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
