import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFileById } from '../../services/files'
import errorHandler from '../../utils/errorHandler'
import PageTemplate from '../../components/layout/PageTemplate'


export default function FilePage() {
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            alert('User not logged in')
            navigate('/')
        }
        async function getFileData() {
            try {
                const response = await getFileById(token, id)
                console.log(response)
                setFile(response)
            } catch (error) {
                errorHandler(error)
            }
        }
        getFileData()
    }, [token])
    return (
        <PageTemplate header={true} footer={true} HaveClass='fileDescription'>
            {file ?
                <>
                    <h2>{file.title}</h2>
                    <p>{file.description}</p>
                    <p style={{ textAlign: 'left' }}>{"Get data on: "}<br/>
                        {file.csvlinks.map((link,index)=>
                            <a key={index} href={link.url}>{link.name}<br/></a>
                        )}
                    </p>
                    <p style={{ fontWeight: '700' }}>{`Author: ${file.author}`}</p>
                    <p>{`Keywords: ${file.keywords.join(', ')}`}</p>
                </>
                :
                <h2>Loading file information...</h2>
            }
        </PageTemplate>
    )
}