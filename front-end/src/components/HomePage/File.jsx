import { FileSpan } from "./FileStyles";

export default function File ({id, title, description, username}) {
    return (
        <FileSpan>
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