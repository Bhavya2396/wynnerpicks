import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const PICKS_COLLECTION = 'picks'

export type PickStatus = 'PENDING' | 'WON' | 'LOST' | 'PUSH' | 'VOID'

export interface Pick {
  id: string
  sport: string
  league: string
  event: string
  market: string
  selection: string
  odds: number
  units: number
  status: PickStatus
  rationale: string
  postedAt: Date
  settledAt?: Date
  finalScore?: string
  notes?: string
}

export const statusColorMap: Record<string, string> = {
  PENDING: 'bg-gray-500',
  WON: 'bg-green-600',
  LOST: 'bg-red-600',
  PUSH: 'bg-gray-400',
  VOID: 'bg-gray-400',
}

const MAX_PICK_LIMIT = 3

export function subscribeToPicksRealtime(
  callback: (picks: Pick[]) => void,
  filters?: { sport?: string; status?: string },
) {
  let q = query(
    collection(db, 'picks'),
    orderBy('postedAt', 'desc'),
    limit(MAX_PICK_LIMIT),
  )

  if (filters?.sport && filters.sport !== 'All') {
    q = query(q, where('sport', '==', filters.sport))
  }

  if (filters?.status && filters.status !== 'All') {
    q = query(q, where('status', '==', filters.status))
  }

  return onSnapshot(q, (snapshot) => {
    const picks: Pick[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          postedAt: doc.data().postedAt?.toDate(),
          settledAt: doc.data().settledAt?.toDate(),
        }) as Pick,
    )
    callback(picks)
  })
}
