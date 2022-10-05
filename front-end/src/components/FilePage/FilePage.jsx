import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFileById } from '../../services/files'
import errorHandler from '../../utils/errorHandler'
import { Container, InnerContent } from '../HomePage/HomepageStyles'
import Header from '../Layout/Header'


export default function FilePage() {
    const [file, setFile] = useState(null)
    const { id } = useParams()
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function getFileData() {
            try {
                const response = await getFileById(token, id)
                setFile(response)
            } catch (error) {
                errorHandler(error)
            }
        }
        getFileData()
    }, [])
    return (
        <Container>
            <Header />
            <InnerContent>
                {file ?
                    <>
                        <h2>{file.title}</h2>
                        <p>{file.description}</p>
                        <p>{"Get data on: "}
                            <a href={file.csvlink}>{file.csvlink}</a>
                        </p>
                        <p>{`Author: ${file.userId}`}</p>
                    </>
                    :
                    <h2>Loading file information...</h2>
                }
            </InnerContent>
        </Container>
    )
}