import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import PickCard from '@/components/PickCard'
import PickDetailModal from '@/components/PickDetailModal'
import FilterBar from '@/components/FilterBar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  subscribeToPicksRealtime,
  type Pick,
  type PickStatus,
} from '@/components/entry'

export const Route = createFileRoute('/live-feed')({
  component: LiveFeedPage,
})

function LiveFeedPage() {
  const [picks, setPicks] = useState<Pick[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPick, setSelectedPick] = useState<Pick | null>(null)
  const [sportFilter, setSportFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<PickStatus | 'All'>('All')

  useEffect(() => {
    const unsubscribe = subscribeToPicksRealtime(
      (newPicks) => {
        setPicks(newPicks)
        setLoading(false)
      },
      { sport: sportFilter, status: statusFilter },
    )

    return () => unsubscribe()
  }, [sportFilter, statusFilter])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Live Feed</h1>
          <p className="text-gray-300">
            Real-time sports picks and analysis as they happen
          </p>
        </div>

      <FilterBar
        sportFilter={sportFilter}
        statusFilter={statusFilter}
        onSportChange={setSportFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : picks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No picks found. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {picks.map((pick) => (
            <PickCard
              key={pick.id}
              pick={pick}
              onClick={() => setSelectedPick(pick)}
            />
          ))}
        </div>
      )}

      <PickDetailModal
        pick={selectedPick}
        open={!!selectedPick}
        onOpenChange={(open) => !open && setSelectedPick(null)}
      />
      </div>
    </div>
  )
}
