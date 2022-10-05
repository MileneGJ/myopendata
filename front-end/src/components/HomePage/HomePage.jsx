import { useEffect, useState } from "react";
import { listAll, listByField } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import Header from "../Layout/Header";
import File from "./File";
import { Container, InnerContent, UploadButton } from "./HomepageStyles";
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function HomePage() {
    const [fileList, setFileList] = useState(null)
    const { search } = useLocation();
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            alert('User not logged in')
            navigate('/')
        } else {
            async function returnList() {
                try {
                    if (search.length > 0) {
                        const searchString = search.replace('?', '').split('=')
                        const field = searchString[0]
                        const content = searchString[1]
                        const response = await listByField(token, { field, content })
                        setFileList(response)
                    } else {
                        const response = await listAll(token)
                        setFileList(response)
                    }
                } catch (error) {
                    errorHandler(error)
                }
            }
            returnList()
        }

    }, [search, token])

    return (
        <Container>
            <Header />
            <InnerContent>
                {
                    fileList ?
                        fileList.length > 0 ?
                            <>
                                {fileList.map((f, index) =>
                                    <File
                                        key={index}
                                        id={f.id}
                                        title={f.title}
                                        description={f.description}
                                        author={f.author}
                                    />)}
                                <UploadButton
                                    onClick={() => navigate('/new-file')}>
                                    + Upload a new file
                                </UploadButton>
                            </>
                            :
                            <>
                                <h2>There are no files to be shown</h2>
                                <Link to='/new-file'><h2>Upload a new one!</h2></Link>
                            </>
                        :
                        <h2>Loading...</h2>
                }
            </InnerContent>
        </Container>
    )
}