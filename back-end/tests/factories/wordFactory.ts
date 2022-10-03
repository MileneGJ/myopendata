import { faker } from "@faker-js/faker";


export default async function wordFactory(){
    return faker.word.noun()
}