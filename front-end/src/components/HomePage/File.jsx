import { FileSpan } from "./FileStyles";

export default function File ({id, title, description, username}) {
    return (
        <FileSpan>
            <div>
                <img src="" alt="" />
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div>
                <h2>
                    {username}
                </h2>
            </div>
        </FileSpan>
    )
}