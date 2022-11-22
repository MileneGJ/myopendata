import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import File from "../../components/File";
import UploadButton from "../../components/File/UploadButton";
import PageTemplate from "../../components/PageTemplate";
import UserContext from "../../contexts/UserContext";
import { listByField } from "../../services/files";
import errorHandler from "../../utils/errorHandler";

export default function AuthorPage() {
  const { authorId } = useParams();
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUserFiles() {
      try {
        const response = await listByField(token, {
          field: "author",
          content: authorId,
        });
        setFileList(response);
      } catch (error) {
        errorHandler(error);
      }
    }
    getUserFiles();
  }, [token, authorId]);
  return (
    <PageTemplate header={true} footer={true}>
      <h2>{authorId}'s activity</h2>
      {userData.id !== parseInt(authorId) && (
        <button>Get in touch on OpenDataChat</button>
      )}
      {fileList ? (
        fileList.length > 0 ? (
          <>
            {fileList.map((f, index) => (
              <File showAuthor={false} key={index} file={f} />
            ))}
            {userData.id === parseInt(authorId) && (
              <UploadButton onClick={() => navigate("/new-file")}>
                + Upload a new file
              </UploadButton>
            )}
          </>
        ) : (
          <>
            <h2>There are no files to be shown</h2>
            {userData.id === parseInt(authorId) && (
              <Link to="/new-file">
                <h2>Upload a new one!</h2>
              </Link>
            )}
          </>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </PageTemplate>
  );
}