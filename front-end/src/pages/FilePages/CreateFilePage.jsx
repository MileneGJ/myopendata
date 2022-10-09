import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import { Form } from "../Auth/AuthStyles";
import PageTemplate from "../../components/layout/PageTemplate";
import ModalForConfirmation from "../../components/createFile/ModalForConfirmation";
import UploadFile from "../../components/createFile/Upload";
import UploadList from "../../components/createFile/UploadList";
import {uniqueId } from 'lodash'
import {filesize} from 'filesize'

export default function CreateFilePage() {
    const navigate = useNavigate()
    const [newFile, setNewFile] = useState({
        title: '',
        csvlink: '',
        description: '',
        keywords: ''
    })
    const [uploadedFiles,setUploadedFiles] = useState([])
    const [goBackOpen, setGoBack] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            alert('User not logged in')
            navigate('/')
        }
    }, [token])

    async function createFile(e) {
        e.preventDefault()
        const rawKeywords = newFile.keywords.toLowerCase().split(';')
        const keywords = rawKeywords.map(k => {
            let newK = k
            if (k[0] === " ") {
                newK = newK.slice(1)
            }
            if (k[k.length - 1] === " ") {
                newK = newK.slice(0, (newK.length - 2))
            }
            return newK
        })
        try {
            await create(token, { ...newFile, keywords })
            setGoBack(true)
        } catch (error) {
            errorHandler(error)
        }
    }

    function handleUpload(files){
        const newUploadedFiles = files.map((file,index)=>({
            id:uniqueId(),
            name:file.name,
            readableSize:filesize(file.size),
            progress:0,
            uploaded:false,
            error:false,
            url:null,
            file
        }))

        setUploadedFiles([...uploadedFiles,...newUploadedFiles])
        newUploadedFiles.forEach(f=>processUpload(f))
    }

    return (
        <PageTemplate header={true} footer={false}>
            <h2>Add data you would like to share with My Open Data community</h2>
            <p>Instructions: <br />
                - Prepare your data as a csv table (ideally with headers) <br />
                - Specify the meaning of each row and its units in description <br />
                - Keywords (at least one) must be separated by semi-colon ( ; ) </p>
            <Form onSubmit={createFile}>
                <input
                    type='text'
                    placeholder="Title of your file"
                    value={newFile.title}
                    onChange={e => setNewFile({ ...newFile, title: e.target.value })}
                />

                <textarea
                    rows={3}
                    placeholder="Description"
                    value={newFile.description}
                    onChange={e => setNewFile({ ...newFile, description: e.target.value })}
                />
                <UploadFile onUpload={handleUpload} newFile={newFile} setNewFile={setNewFile} />
                {uploadedFiles.length?<UploadList files={uploadedFiles} />:null}
                <input
                    type='text'
                    placeholder="Keywords"
                    value={newFile.keywords}
                    onChange={e => setNewFile({ ...newFile, keywords: e.target.value })}
                />

                <button type='submit'>Upload</button>
            </Form>

            <ModalForConfirmation
                modalIsOpen={goBackOpen}
                closeModal={() => setGoBack(false)}
                action={() => navigate('/home')}
                questionAnswers={[
                    `"${newFile.title}" was successfully created. Add another file?`,
                    "Yes",
                    "No, go back",
                ]}
            />
        </PageTemplate>
    )
}