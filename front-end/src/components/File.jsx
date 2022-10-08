import { useNavigate } from "react-router-dom";
import { FileSpan } from "./FileStyles";

export default function File({ id, title, description, author, keywords }) {
    const navigate = useNavigate()

    return (
        <FileSpan onClick={() => navigate(`/file/${id}`)}>
            <div>
                <h2>{title} by {author}</h2>
                <p>{description.slice(0, 60) + '...'}</p>
            </div>
            <div>
                <h2>
                    Keywords:
                </h2>
                <p>{keywords.join(', ')}</p>
            </div>
        </FileSpan>
    )
}