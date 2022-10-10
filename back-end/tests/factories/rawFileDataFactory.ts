import {faker} from '@faker-js/faker'
import { Readable } from'stream';

export default async function rawFileDataFactory () {  
    const stream = new Readable({
        read() {}
      });
    const buffer = Buffer.alloc(faker.datatype.number());
            
    return {
        bucket: faker.datatype.string(),
        key:  faker.datatype.uuid(),
        acl: faker.datatype.string(),
        contentType: faker.datatype.string(),
        contentDisposition: faker.datatype.string(),
        storageClass: faker.datatype.string(),
        serverSideEncryption: faker.datatype.string(),
        metadata:undefined,
        location:faker.internet.url(),
        etag:faker.datatype.uuid(),
        versionId:undefined,
        originalname: faker.commerce.productDescription(),
        filename: faker.commerce.productDescription(),
        fieldname: faker.datatype.string(),
        stream,
        destination:faker.datatype.string(),
        path:faker.datatype.string(),
        buffer,
        encoding:faker.datatype.string(),
        mimetype:faker.datatype.string(),
        size: faker.datatype.number()
    }
}

