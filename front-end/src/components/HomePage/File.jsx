import { useNavigate } from "react-router-dom";
import { FileSpan } from "./FileStyles";

export default function File ({id, title, description, username}) {
    const navigate = useNavigate()

    return (
        <FileSpan onClick={()=>navigate(`/file/${id}`)}>
            <div>
                <img src="" alt="" />
                <div>
                    <h2>{title}</h2>
                    <p>{description.slice(0,60)+'...'}</p>
                </div>
            </div>
            <div>
                <h2>
                    Author:
                </h2>
                <p>{username}</p>
            </div>
        </FileSpan>
    )
}