import { faker } from '@faker-js/faker'

export function GET() {
  const campuses = ['Fenell', 'Hamilton Intl Airport', 'Stoney Creek', 'McMaster']
  const size = faker.number.int({ min: 200, max: 500 })
  const { city, country, street, state, buildingNumber } = faker.location
  const students = new Array(size).fill(0).map(() => ({
    number: generateStudentNumber(),
    name: { first: faker.person.firstName(), last: faker.person.lastName() },
    address: `${buildingNumber()} ${street()}, ${city()}, ${state()}, ${country()}`,
    mohawkCampus: campuses[faker.number.int({ min: 0, max: 4 })],
    bio: faker.person.bio(),
    contact: faker.phone.number(),
  }))
  return Response.json({ createdBy: 'Truong Nguyen', students })
}

function generateStudentNumber() {
  return new Array(9)
    .fill(0)
    .map(() => faker.number.int({ min: 0, max: 9 }))
    .join('')
    .replace(/^\d{3}/, '000')
}
