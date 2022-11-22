import { useNavigate } from "react-router-dom";
import FileSpan from "./FileSpan";
import UserIcon from "./UserIcon";
import FileContainer from "./FileContainer";

export default function File({ showAuthor, file }) {
  const { id, title, description, author, authorId, keywords } = file;
  const navigate = useNavigate();

  return (
    <FileContainer>
      {showAuthor && (
        <UserIcon onClick={() => navigate(`/author/${authorId}`)}>
          <div>{author[0]}</div>
          <p>{author}</p>
        </UserIcon>
      )}
      <FileSpan onClick={() => navigate(`/file/${id}`)}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <h2>Keywords:</h2>
          <p>{keywords.join(", ")}</p>
        </div>
      </FileSpan>
    </FileContainer>
  );
}
