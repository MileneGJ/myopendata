import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create, createFileData } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import { Form } from "../Auth/AuthStyles";
import PageTemplate from "../../components/layout/PageTemplate";
import ModalForConfirmation from "../../components/createFile/ModalForConfirmation";
import UploadFile from "../../components/createFile/Upload";
import UploadList from "../../components/createFile/UploadList";
import { uniqueId } from 'lodash'
import { filesize } from 'filesize'

export default function CreateFilePage() {
    const navigate = useNavigate()
    const [newFile, setNewFile] = useState({
        title: '',
        csvlink: [],
        description: '',
        keywords: ''
    })
    const [uploadedFiles, setUploadedFiles] = useState([])
    // const [concludedFiles, setConcludedFiles] = useState([])
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

    function handleUpload(files) {
        const newUploadedFiles = files.map((file, index) => ({
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
            file
        }))

        setUploadedFiles([...uploadedFiles, ...newUploadedFiles])
        newUploadedFiles.forEach(f => processUpload(f))
    }

    async function processUpload(uploadedFile) {
        const data = new FormData();
        data.append('file', uploadedFile.file, uploadedFile.name)

        // const onUploadProgress = e => {
        //     const progress = parseInt(Math.round((e.loaded * 100) / e.total))
        //     updateFile(uploadedFile.id,{progress})
        // }
        try {
            
            const concludedFile = await createFileData(token, data)
            // updateFile(uploadedFile.id,{
            //     uploaded:true,
            //     id:concludedFile.id,
            //     url:concludedFile.url
            // })
            setNewFile({...newFile,csvlink:[...newFile.csvlink,concludedFile.url]})
            console.log(newFile.csvlink)
        } catch (error) {
            console.log(error)
            errorHandler(error)
        }
    }

    // function updateFile (id,data) {
    //     setConcludedFiles(uploadedFiles.map(uploadedFile=>{
    //         return id === uploadedFile.id? {...uploadedFile,...data} : uploadedFile
    //     }))
    //     console.log(concludedFiles)
    // }

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
                <UploadFile onUpload={handleUpload} />
                {uploadedFiles.length ? <UploadList files={uploadedFiles} /> : null}
                {/*concludedFiles.length ? <UploadList files={concludedFiles} /> : null*/}
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