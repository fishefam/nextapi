import { NextRequest } from 'next/server'
import { faker } from '@faker-js/faker'
import validator from 'validator'

export async function GET(req: NextRequest) {
  const params = ['number', 'firstname', 'lastname']
  const searchParams = new URLSearchParams(
    Array.from(req.nextUrl.searchParams.entries()).map((p) => [p[0].toLowerCase(), p[1]])
  )
  const vals = params.map((param) => searchParams.get(param))
  const checkedVals = checkParams(vals)
  if (checkedVals.isInvalid) return Response.json({ error: 'Invalid Query Paramaters' })

  if (checkedVals.params.number && Object.keys(checkedVals.params).length > 1)
    return Response.json({ error: 'Parameter `number` can only exist alone' })

  if (checkedVals.params.number) {
    if (!validator.isNumeric(checkedVals.params.number) || checkedVals.params.number.length !== 9)
      return Response.json({
        error: 'Invalid student number!',
      })
    const campuses = ['Fenell', 'Hamilton Intl Airport', 'Stoney Creek', 'McMaster']
    const { city, country, street, state, buildingNumber } = faker.location
    const student = {
      number: checkedVals.params.number,
      name: { first: faker.person.firstName(), last: faker.person.lastName() },
      address: `${buildingNumber()} ${street()}, ${city()}, ${state()}, ${country()}`,
      mohawkCampus: campuses[faker.number.int({ min: 0, max: 4 })],
      bio: faker.person.bio(),
      contact: faker.phone.number(),
    }
    if (faker.datatype.boolean({ probability: 0.7 }))
      return Response.json({ createdBy: 'Truong Nguyen', student })
    return Response.json({
      error: `Student with the number ${checkedVals.params.number} not found!`,
    })
  }

  if (!checkedVals.params.number) {
    const campuses = ['Fenell', 'Hamilton Intl Airport', 'Stoney Creek', 'McMaster']
    const { city, country, street, state, buildingNumber } = faker.location
    const size = faker.number.int({ min: 1, max: 50 })
    const students = new Array(size).fill(0).map(() => ({
      number: generateStudentNumber(),
      name: {
        first: checkedVals.params.firstname ?? faker.person.firstName(),
        last: checkedVals.params.lastname ?? faker.person.lastName(),
      },
      address: `${buildingNumber()} ${street()}, ${city()}, ${state()}, ${country()}`,
      mohawkCampus: campuses[faker.number.int({ min: 0, max: 4 })],
      bio: faker.person.bio(),
      contact: faker.phone.number(),
    }))
    if (faker.datatype.boolean({ probability: 0.7 }))
      return Response.json({ createdBy: 'Truong Nguyen', students })
    return Response.json({
      error: `No student named ${
        checkedVals.params.firstname && checkedVals.params.lastname
          ? `${checkedVals.params.firstname} ${checkedVals.params.lastname}`
          : checkedVals.params.firstname
          ? checkedVals.params.firstname
          : checkedVals.params.lastname
      } found!`,
    })
  }
}

function checkParams(params: unknown[]) {
  const ps = ['number', 'firstname', 'lastname']
  let isInvalid = true
  params.forEach((p) => {
    if (p) isInvalid = false
  })
  return {
    isInvalid,
    params: Object.fromEntries(
      params.map((p, i) => [ps[i].toLowerCase(), p]).filter(([_, p]) => p)
    ),
  }
}

function generateStudentNumber() {
  return new Array(9)
    .fill(0)
    .map(() => faker.number.int({ min: 0, max: 9 }))
    .join('')
    .replace(/^\d{3}/, '000')
}
