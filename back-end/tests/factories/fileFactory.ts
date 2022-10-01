import { faker } from "@faker-js/faker";

export default async function fileFactory () {
    const rawKeywords = faker.datatype.array(10) as string[]
    const keywords = rawKeywords.map(k=>typeof(k)!=='string'? k + "":k)
        
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        csvlink: faker.image.imageUrl(),
        keywords
    }
}