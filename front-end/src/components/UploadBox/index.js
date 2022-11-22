import { Component } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import UploadFile from "../../components/UploadBox/Upload";
import UploadList from "../../components/UploadBox/UploadList";
import { createFileData, deleteFileData } from "../../services/files";
import errorHandler from "../../utils/errorHandler";

export default class UploadBox extends Component {
  state = {
    uploadedFiles: [],
  };

  addFile = (newUploadedFiles) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(newUploadedFiles),
    });
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  deleteFromList = (id) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((f) => f.id !== id),
    });
  };

  render() {
    const { uploadedFiles } = this.state;
    const { newFile, setNewFile } = this.props;
    const token = localStorage.getItem("token");

    const deleteFileItem = async (id) => {
      try {
        await deleteFileData(token, id);
        this.deleteFromList(id);
      } catch (error) {
        errorHandler(error);
      }
    };

    const handleUpload = (files) => {
      const newUploadedFiles = files.map((file) => ({
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        progress: 0,
        preview: URL.createObjectURL(file),
        uploaded: false,
        error: false,
        url: null,
        file,
      }));

      this.addFile(newUploadedFiles);
      newUploadedFiles.forEach(processUpload);
    };

    const processUpload = (uploadedFile) => {
      const data = new FormData();
      data.append("file", uploadedFile.file, uploadedFile.name);

      const onUploadProgress = (e) => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        this.updateFile(uploadedFile.id, {
          progress,
        });
      };
      createFileData(token, data, onUploadProgress)
        .then((res) => {
          this.updateFile(uploadedFile.id, {
            uploaded: true,
            id: res.id,
            url: res.url,
          });
          setNewFile({
            ...newFile,
            csvlink: [...newFile.csvlink, res.url],
          });
          console.log(newFile);
        })
        .catch(() => {
          this.updateFile(uploadedFile.id, {
            error: true,
          });
        });
    };

    return (
      <>
        <UploadFile onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <UploadList files={uploadedFiles} deleteFileItem={deleteFileItem} />
        )}
      </>
    );
  }
}
