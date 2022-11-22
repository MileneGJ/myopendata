import { useEffect, useState } from "react";
import { listAll, listByField } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import File from "../../components/File";
import UploadButton from "../../components/File/UploadButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageTemplate from "../../components/PageTemplate";

export default function HomePage() {
  const [fileList, setFileList] = useState(null);
  const { search } = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function returnList() {
      try {
        if (search.length > 0) {
          const searchString = search.replace("?", "").split("=");
          const field = searchString[0];
          const content = searchString[1];
          const response = await listByField(token, { field, content });
          setFileList(response);
        } else {
          const response = await listAll(token);
          setFileList(response);
        }
      } catch (error) {
        errorHandler(error);
      }
    }
    returnList();
  }, [search, token]);

  return (
    <PageTemplate header={true} footer={true}>
      {fileList ? (
        fileList.length > 0 ? (
          <>
            {fileList.map((f, index) => (
              <File
                showAuthor={true}
                key={index}
                id={f.id}
                title={f.title}
                description={f.description}
                author={f.author}
                keywords={f.keywords}
              />
            ))}
            <UploadButton onClick={() => navigate("/new-file")}>
              + Upload a new file
            </UploadButton>
          </>
        ) : (
          <>
            <h2>There are no files to be shown</h2>
            <Link to="/new-file">
              <h2>Upload a new one!</h2>
            </Link>
          </>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </PageTemplate>
  );
}
