import { useState } from "react";
import { create } from "../../services/files";
import errorHandler from "../../utils/errorHandler";
import { Form } from "../Auth/AuthStyles";
import { Container, InnerContent, UploadButton } from "../HomePage/HomepageStyles";
import Header from "../Layout/Header";

export default function CreateFilePage () {
    const [newFile,setNewFile] = useState({
        title:'',
        csvlink:'',
        description:'',
        keywords:''
    })
    const token = localStorage.getItem('token')

    async function createFile (e) {
        e.preventDefault()
        const rawKeywords = newFile.keywords.toLowerCase().split(';')
        const keywords = rawKeywords.map(k=>{
            let newK = k
            if(k[0]===" "){
                newK = newK.slice(1)
            }
            if(k[k.length-1]===" "){
                newK = newK.slice(0,(newK.length-2))
            }
            return newK
        })
        try {
            const createdFile = await create(token,{...newFile,keywords})
            alert(`"${createdFile.title}" was successfully created`)
        } catch (error) {
            errorHandler(error)
        }
    }

    return(
        <Container>
            <Header />
            <InnerContent>
            <h2>Add data you would like to share with My Open Data community</h2>
            <p>Instructions: <br/> - Share a link for a csv table (ideally with headers) <br/> - Specify the meaning of each row and its units in description <br /> - Keywords must be separated by semi-colon ( ; ) </p>
            <Form onSubmit={createFile}>
                <input 
                type='text' 
                placeholder="Title of your file" 
                value={newFile.title} 
                onChange={e=>setNewFile({...newFile,title:e.target.value})}
                />

                <input 
                type='url' 
                placeholder="Link for the .csv" 
                value={newFile.csvlink} 
                onChange={e=>setNewFile({...newFile,csvlink:e.target.value})}
                />

                <textarea 
                rows={3} 
                placeholder="Description" 
                value={newFile.description} 
                onChange={e=>setNewFile({...newFile,description:e.target.value})}
                />

                <input 
                type='text' 
                placeholder="Keywords" 
                value={newFile.keywords} 
                onChange={e=>setNewFile({...newFile,keywords:e.target.value})}
                />

                <button type='submit'>Upload</button>
            </Form>
            </InnerContent>
        </Container>
    )
}