import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  return Response.json({
    createdBy: 'Truong Nguyen',
    Note: 'Apis return randomized info. Params are case insensitive',
    mainLibraries: ['NextJS', 'Faker'],
    endpoints: {
      '/api/students': 'Return a random list of [200-500] students',
      '/api/student?number=#########': 'Return the student with the exact 9-digit student number',
      '/api/student?firstname=...': 'Return a list of firstname matched students',
      '/api/student?lastname=...': 'Return a list of lastname matched students',
      '/api/student?firstname=...&lastname=...':
        'Return a list of first and lastname matched students',
    },
  })
}
