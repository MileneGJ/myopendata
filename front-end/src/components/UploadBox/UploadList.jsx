import "react-circular-progressbar/dist/styles.css";
import UploadUl from "./UploadUl";
import FileItem from "./FileItem";

export default function UploadList({ files }) {
  return (
    <UploadUl>
      {files.map((file, index) => (
        <FileItem
          key={index}
          name={file.name}
          readableSize={file.readableSize}
          progress={file.progress}
          url={file.url}
          error={file.error}
          uploaded={file.uploaded}
        />
      ))}
    </UploadUl>
  );
}
