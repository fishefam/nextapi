import { Timestamp, doc, getDoc } from 'firebase/firestore'
import { NextRequest } from 'next/server'
import { db } from '../route'

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
