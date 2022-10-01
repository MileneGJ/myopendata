import { faker } from "@faker-js/faker";

export default async function idFactory () {
    return faker.datatype.number({min:1,max:10})
}