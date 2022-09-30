import {faker} from '@faker-js/faker'

export default async function userFactory () {
    let password = faker.random.alphaNumeric(10,{casing:'mixed'})
    const regex = /^[0-9]$/
    if(!regex.test(password)) password += '1'
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password
    }
}