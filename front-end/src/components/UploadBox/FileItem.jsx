import { CircularProgressbar } from "react-circular-progressbar";
import { MdLink, MdCheckCircle, MdError } from "react-icons/md";

export default function FileItem({
  name,
  readableSize,
  deleteFileItem,
  progress,
  error,
  uploaded,
  url,
}) {
  return (
    <li>
      <div>
        <h3>{name}</h3>
        <span>
          <p>{readableSize}</p>
          {url && <h4 onClick={deleteFileItem}>Excluir</h4>}
        </span>
      </div>
      <div>
        {!uploaded && !error && (
          <CircularProgressbar
            value={progress}
            styles={{
              root: { width: 24 },
              path: { stroke: "#6aa84f" },
            }}
            strokeWidth={10}
          />
        )}

        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <MdLink style={{ marginRight: 8 }} size={24} color="#222222" />
          </a>
        )}

        {uploaded && <MdCheckCircle size={24} color="#6aa84f" />}
        {error && <MdError size={24} color="#e57878" />}
      </div>
    </li>
  );
}
