export async function GET() {
  return Response.json({
    createdBy: 'Truong Nguyen',
    Note: 'Apis return randomized info. Params are case insensitive. `looper` api is intended to be used in browser.',
    mainLibraries: ['NextJS', 'Faker'],
    endpoints: {
      '/api/message':
        'GET method to retrieve all messages stored in database. POST method with a body in the type of { message: string | string[] } to add a message or messages to database',
      '/api/message/[messageId]':
        "GET method to retrieve a specific message using the message's id",
      '/api/looper/start': "You'll stuck in a counting loop",
      '/api/looper/start?from=###text-###-in-between':
        "You'll stuck in a counting loop starting from a given number. Non digit characters are removed.",
      '/api/looper/start?from=####&reversed=true': 'Reversed loop',
      '/api/students': 'Return a random list of [200-500] students',
      '/api/student?number=#########': 'Return the student with the exact 9-digit student number',
      '/api/student?firstname=...': 'Return a list of firstname matched students',
      '/api/student?lastname=...': 'Return a list of lastname matched students',
      '/api/student?firstname=...&lastname=...':
        'Return a list of first and lastname matched students',
    },
  })
}
