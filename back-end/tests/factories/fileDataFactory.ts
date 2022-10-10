import {faker} from '@faker-js/faker'

export default async function fileDataFactory () {        
    return {
        key: faker.datatype.uuid(),
        name: faker.commerce.productDescription(),
        url: faker.internet.url(),
        size: faker.datatype.number()
    }
}