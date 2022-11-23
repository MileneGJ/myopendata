import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFile, getFileById } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import PageTemplate from "../../components/PageTemplate";
import { MdDelete } from "react-icons/md";
import UserContext from "../../contexts/UserContext";

export default function FilePage() {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function getFileData() {
      try {
        const response = await getFileById(token, id);
        setFile(response);
      } catch (error) {
        errorHandler(error);
      }
    }
    getFileData();
  }, [token, id]);

  async function deleteOneFile() {
    try {
      await deleteFile(token, file.id);
      navigate("/home");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <PageTemplate header={true} footer={true} HaveClass="fileDescription">
      {file ? (
        <>
          <h2>{file.title}</h2>
          {file?.authorId === userData.id && (
            <MdDelete
              style={{ cursor: "pointer" }}
              onClick={deleteOneFile}
              size={24}
            />
          )}
          <p>{file.description}</p>
          <p style={{ textAlign: "left" }}>
            {"Get data on: "}
            <br />
            {file.csvlinks.map((link, index) => (
              <a key={index} href={link.url}>
                {link.name}
                <br />
              </a>
            ))}
          </p>
          <p
            style={{ fontWeight: "700", cursor: "pointer" }}
            onClick={() => navigate(`/author/${file.authorId}`)}
          >
            {`Author: ${file.author}`}
          </p>
          <p>{`Keywords: ${file.keywords.join(", ")}`}</p>
        </>
      ) : (
        <h2>Loading file information...</h2>
      )}
    </PageTemplate>
  );
}
