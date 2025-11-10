import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  startAfter,
  endBefore,
  limitToLast,
  type QueryDocumentSnapshot,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { statusColorMap, type Pick, type PickStatus } from '@/components/entry'
import { toast } from 'sonner'
import MobilePickCard from '@/components/Ledger/MobilePickCard'
import PaginationControls from '@/components/Ledger/PaginationControls'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export const Route = createFileRoute('/ledger')({
  component: LedgerPage,
})

const ITEMS_PER_PAGE = 10

function LedgerPage() {
  const { isAdmin } = useAuth()
  const [picks, setPicks] = useState<Pick[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<PickStatus | 'All'>('All')

  const [firstDoc, setFirstDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [pageStack, setPageStack] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])

  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchMode, setIsSearchMode] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchText])

  const fetchPicksWithCursor = async (
    direction: 'next' | 'prev' | 'initial' = 'initial',
  ) => {
    setLoading(true)

    try {
      const constraints: QueryConstraint[] = [orderBy('postedAt', 'desc')]

      if (sportFilter && sportFilter !== 'All') {
        console.log('Adding sport filter:', sportFilter)
        constraints.push(where('sport', '==', sportFilter))
      }

      if (statusFilter && statusFilter !== 'All') {
        console.log('Adding status filter:', statusFilter)
        constraints.push(where('status', '==', statusFilter))
      }

      if (direction === 'next' && lastDoc) {
        constraints.push(startAfter(lastDoc))
        constraints.push(limit(ITEMS_PER_PAGE + 1))
      } else if (direction === 'prev' && firstDoc) {
        constraints.push(endBefore(firstDoc))
        constraints.push(limitToLast(ITEMS_PER_PAGE + 1))
      } else {
        constraints.push(limit(ITEMS_PER_PAGE + 1))
      }

      const q = query(collection(db, 'picks'), ...constraints)

      const snapshot = await getDocs(q)
      const docs = snapshot.docs
      const hasMore = docs.length > ITEMS_PER_PAGE
      const picksToShow = hasMore ? docs.slice(0, ITEMS_PER_PAGE) : docs

      const picksData: Pick[] = picksToShow.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            postedAt: doc.data().postedAt?.toDate(),
            settledAt: doc.data().settledAt?.toDate(),
          }) as Pick,
      )

      setPicks(picksData)

      if (picksToShow.length > 0) {
        setFirstDoc(picksToShow[0])
        setLastDoc(picksToShow[picksToShow.length - 1])
      }

      if (direction === 'next') {
        setHasNextPage(hasMore)
        setHasPrevPage(true)
        if (firstDoc) {
          setPageStack((prev) => [...prev, firstDoc])
        }
      } else if (direction === 'prev') {
        setHasNextPage(true)
        setPageStack((prev) => prev.slice(0, -1))
        setHasPrevPage(pageStack.length > 1)
      } else {
        setHasNextPage(hasMore)
        setHasPrevPage(false)
        setPageStack([])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching picks:', error)
      toast.error('Error fetching picks')
      setLoading(false)
    }
  }

  const fetchAllPicksForSearch = async () => {
    setLoading(true)

    try {
      let q = query(collection(db, 'picks'), orderBy('postedAt', 'desc'))

      if (sportFilter && sportFilter !== 'All') {
        q = query(q, where('sport', '==', sportFilter))
      }

      if (statusFilter && statusFilter !== 'All') {
        q = query(q, where('status', '==', statusFilter))
      }

      const snapshot = await getDocs(q)

      const allPicks: Pick[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            postedAt: doc.data().postedAt?.toDate(),
            settledAt: doc.data().settledAt?.toDate(),
          }) as Pick,
      )

      const searchLower = debouncedSearch.toLowerCase()
      const filteredPicks = allPicks.filter(
        (pick) =>
          pick.event.toLowerCase().includes(searchLower) ||
          pick.selection.toLowerCase().includes(searchLower),
      )

      setPicks(filteredPicks)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching picks:', error)
      toast.error('Error fetching picks for the search')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedSearch.trim()) {
      setIsSearchMode(true)
      setCurrentPage(1)
      fetchAllPicksForSearch()
    } else {
      setIsSearchMode(false)
      fetchPicksWithCursor('initial')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sportFilter, statusFilter])

  const paginatedPicks = isSearchMode
    ? picks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      )
    : picks

  const totalPages = isSearchMode ? Math.ceil(picks.length / ITEMS_PER_PAGE) : 0

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Complete Ledger</h1>
          <p className="text-gray-300">
            Complete transparent record of all picks with advanced filtering and search
          </p>
        </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search events or teams across all pages..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && !debouncedSearch && (
            <p className="text-xs text-muted-foreground mt-1">Searching...</p>
          )}
        </div>
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Sports</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as PickStatus | 'All')
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="WON">Won</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
            <SelectItem value="PUSH">Push</SelectItem>
            <SelectItem value="VOID">Void</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : paginatedPicks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {isSearchMode ? 'No picks match your search.' : 'No picks found.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table view - hidden on mobile */}
          <div className="hidden md:block glass-card rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Selection</TableHead>
                  <TableHead className="text-right">Odds</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Score</TableHead>
                  {isAdmin && (
                    <TableHead className="text-center">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPicks.map((pick) => (
                  <TableRow key={pick.id}>
                    <TableCell className="text-sm">
                      {format(pick.postedAt, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-sm">{pick.sport}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {pick.event}
                    </TableCell>
                    <TableCell className="text-sm">{pick.market}</TableCell>
                    <TableCell className="text-sm">{pick.selection}</TableCell>
                    <TableCell className="text-sm text-right">
                      {pick.odds.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {pick.units}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${statusColorMap[pick.status]} text-white`}
                      >
                        {pick.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {pick.finalScore || '-'}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-center">
                        <Link to="/edit-entry/$id" params={{ id: pick.id }}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden">
            {paginatedPicks.map((pick) => (
              <MobilePickCard key={pick.id} pick={pick} />
            ))}
          </div>

          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            picksCount={picks.length}
            paginatedPicksCount={paginatedPicks.length}
            fetchPicks={(p) => fetchPicksWithCursor(p)}
            loading={loading}
            isSearchMode={isSearchMode}
          />
        </>
      )}
      </div>
    </div>
  )
}
