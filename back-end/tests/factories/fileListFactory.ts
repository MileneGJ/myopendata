import { faker } from "@faker-js/faker";
import fileFactory from "./fileFactory";

export default async function fileListFactory (length:number) {
    const fileList = []
    for(let i=0;i<length;i++) {
        const file = await fileFactory()
        const filesKeywords = file.keywords.map(k=>({keywords:{name:k}}))
        fileList.push({
            id:i,
            title:file.title,
            description:file.description,
            csvlink:file.csvlink,
            users:{
                name:faker.name.firstName()
            },
            filesKeywords
        })
    }
    return fileList
}