import EntryForm from '@/components/EntryForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/new-entry')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Create New Pick</h1>
          <p className="text-gray-300">
            Add a new pick to the system with all required details
          </p>
        </div>
        <EntryForm />
      </div>
    </div>
  )
}
