import "react-circular-progressbar/dist/styles.css";
import UploadUl from "./UploadUl";
import FileItem from "./FileItem";

export default function UploadList({ files, deleteFileItem }) {
  return (
    <UploadUl>
      {files.map((file, index) => (
        <FileItem
          key={index}
          name={file.name}
          readableSize={file.readableSize}
          deleteFileItem={() => deleteFileItem(file.id)}
          progress={file.progress}
          url={file.url}
          error={file.error}
          uploaded={file.uploaded}
        />
      ))}
    </UploadUl>
  );
}
