import { fa, faker } from '@faker-js/faker'
import { initializeApp } from 'firebase/app'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { NextRequest } from 'next/server'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function GET() {
  const snap = await getDocs(collection(db, 'message'))
  const messages = snap.docs.map((doc) => ({
    message: doc.data().text,
    id: doc.id,
    createdAt: doc.data().createdAt.toDate(),
  }))
  return Response.json(messages)
}

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: string | string[] }
    // const message = new Array(234).fill(
    //   faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))
    // )

    if (message instanceof Array) {
      const submission = await Promise.all(
        message.map((text) => {
          return addDoc(collection(db, 'message'), {
            text,
            createdAt: Timestamp.fromDate(new Date()),
          })
        })
      )
      return Response.json({ successful: true, queryIds: submission.map(({ id }) => id) })
    }

    const { id } = await addDoc(collection(db, 'message'), { text: message })
    return Response.json({ queryId: id, successful: true })
  } catch {
    return Response.json({ successful: false })
  }
}
