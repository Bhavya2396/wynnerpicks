import { Button } from '@/components/ui/button'

interface PaginationControlsProps {
  currentPage: number
  setCurrentPage: (page: number | ((p: number) => number)) => void
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  picksCount: number
  paginatedPicksCount: number
  fetchPicks: (p: 'prev' | 'next') => Promise<void>
  loading: boolean
  isSearchMode: boolean
}

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  picksCount,
  paginatedPicksCount,
  fetchPicks,
  loading,
  isSearchMode,
}: PaginationControlsProps) {
  if (isSearchMode) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({picksCount} results)
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedPicksCount} picks per page
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPicks('prev')}
            disabled={!hasPrevPage || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPicks('next')}
            disabled={!hasNextPage || loading}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
}
