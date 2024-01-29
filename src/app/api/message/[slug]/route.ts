import { Timestamp, doc, getDoc, getFirestore } from 'firebase/firestore'
import { NextRequest } from 'next/server'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const id = params.slug
    const snap = await getDoc(doc(db, 'message', id))
    const { text, createdAt } = snap.data() as { createdAt: Timestamp; text: string }
    return Response.json({ message: text, id, createdAt: createdAt.toDate() })
  } catch {
    return Response.json({ successful: false })
  }
}
