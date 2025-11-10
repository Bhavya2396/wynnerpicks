import { createFileRoute } from '@tanstack/react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PICKS_COLLECTION } from '@/components/entry'
import EntryForm from '@/components/EntryForm'

export const Route = createFileRoute('/_admin/edit-entry/$id')({
  loader: async ({ params }) => {
    const docRef = doc(db, PICKS_COLLECTION, params.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      throw new Error('Pick not found')
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    }
  },
  component: EditEntryPage,
})

function EditEntryPage() {
  const loaderData = Route.useLoaderData()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Edit Pick</h1>
          <p className="text-gray-300">
            Update pick details and status information
          </p>
        </div>
        <EntryForm initialData={loaderData} mode="edit" />
      </div>
    </div>
  )
}
