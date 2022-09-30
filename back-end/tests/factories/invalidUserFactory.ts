import {faker} from '@faker-js/faker'

export default async function invalidUserFactory () {
    const password = faker.internet.password(8,true,/[A-Z]/)
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password
    }
}