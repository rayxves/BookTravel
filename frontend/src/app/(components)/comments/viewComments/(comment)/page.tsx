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

interface CommentType {
  id: number;
  content: string;
  createdOn: string;
  createdBy: string;
  touristSpotId: number;
  placeTypeId: number | null;
}

export default function Comment({ comment }: { comment: CommentType }) {
  const dateObj = new Date(comment.createdOn);
  const formattedDate = dateObj.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });


  return (
    <CommentItem>
      <CommentContent>
        <DateContainer>
          <StyledDate>{formattedDate}</StyledDate>
          <IconsContainer>
            <FontAwesomeIcon icon={faPenToSquare} />
            <button></button>
            <FontAwesomeIcon icon={faTrashCan} />
            <button></button>
          </IconsContainer>
        </DateContainer>
        <Content>{comment.content}</Content>
      </CommentContent>
    </CommentItem>
  );
}
