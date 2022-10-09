import Dropzone from 'react-dropzone'
import { DropContainer } from "./UploadStyles";

export default function UploadFile ({onUpload,newFile,setNewFile}) {
    return (
        <Dropzone accept={{ 'text/*': ['.csv','.txt'] }} onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
            >
                <input {...getInputProps()}
                    value={newFile.csvlink}
                    onChange={e => setNewFile({ ...newFile, csvlink: e.target.value })}
                />
                {!isDragActive ? <p>Click to upload or drag your file here</p>
                    : isDragReject ? <p>Format not supported</p> : <p>Drop file here</p>}
            </DropContainer>
        )}
    </Dropzone>
    )
}