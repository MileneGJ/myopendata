import { useEffect, useState } from "react";
import { listAll } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import Header from "../Layout/Header";
import File from "./File";
import { Container, ListContainer, UploadButton } from "./HomepageStyles";
import { Link, useNavigate } from 'react-router-dom'


export default function HomePage() {
    const [fileList, setFileList] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            alert('User not logged in')
            navigate('/')
        }
        async function returnList() {
            try {
                const response = await listAll(token)
                setFileList(response)
            } catch (error) {
                errorHandler(error)
            }
        }
        returnList()

    }, [])

    return (
        <Container>
            <Header />
            <ListContainer>
                {
                    fileList ?
                        fileList.length > 0 ?
                            <>
                                {fileList.map((f, index) =>
                                    <File
                                        key={index}
                                        title={f.title}
                                        description={f.description}
                                        username={f.userId}
                                    />)}
                                <UploadButton
                                    onClick={() => navigate('/new-file')}>
                                    + Upload a new file
                                </UploadButton>
                            </>
                            :
                            <>
                                <h2>There are no files to be shown</h2>
                                <Link><h2>Upload a new one!</h2></Link>
                            </>
                        :
                        <h2>Loading...</h2>
                }
            </ListContainer>
        </Container>
    )
}