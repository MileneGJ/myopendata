import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { MdLink, MdCheckCircle, MdError } from 'react-icons/md'
import { UploadUl } from './UploadStyles'

export default function UploadList({files}) {

    function FileItem ({name,readableSize,progress,error,uploaded,url}) {
        return (
            <li>
                <div>
                    <h3>{name}</h3>
                    <span>
                        <p>{readableSize}</p>
                        {url?<button>Excluir</button>:null}
                    </span>
                </div>
                <div>
                    {!uploaded&&!error?<CircularProgressbar
                    value={progress} 
                        styles={{
                            root: { width: 24 },
                            path: { stroke: '#6aa84f' }
                        }}
                        strokeWidth={10}
                    />:null}

                    {url?<a
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <MdLink style={{ marginRight: 8 }} size={24} color='#222222' />
                    </a>:null}

                    {uploaded?<MdCheckCircle size={24} color='#6aa84f' />:null}
                    {error?<MdError size={24} color='#e57878' />:null}
                </div>
            </li>
        )
    }

    return (
        <UploadUl>
            {files.map((file,index)=>
            <FileItem 
            key={index}
            name={file.name}
            readableSize={file.readableSize}
            progress={file.progress}
            url={file.url}
            error={file.error}
            uploaded={file.uploaded}
            />)}
        </UploadUl>
    )
}