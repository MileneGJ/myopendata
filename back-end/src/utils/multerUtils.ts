import multer,{ FileFilterCallback } from 'multer'
import path from 'path'
import crypto from 'crypto'
import { Request } from 'express'
import { wrongSchemaError } from '../utils/errorUtils'
import { DestinationCallback, FileNameCallback } from '../types/generalTypes'
import multerS3 from 'multer-s3'
import  { S3Client } from '@aws-sdk/client-s3'


export const uploadPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

const fileStorage = multer.diskStorage({ 
    destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
): void => {

    callback(null, uploadPath)
},
    filename: filename
})

function filename (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
): void {

    crypto.randomBytes(16, (error, hash) => {
        const fileName = `${hash.toString('hex')} - ${file.originalname}`
        callback(null, fileName)
    })
}



const awsS3 = multerS3({
    s3: new S3Client({
        region:process.env.AWS_DEFAULT_REGION,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY as string
        }
    }),
    bucket: 'myopendata-uploads',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: filename
})

export const storageTypes = {
    local: fileStorage,
    s3: awsS3
}

export function fileFilter (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void {

    const allowedMimes = [
        'text/plain',
        'text/csv'
    ];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true)
    }
    else {
        throw wrongSchemaError('File type not supported')
    }
}