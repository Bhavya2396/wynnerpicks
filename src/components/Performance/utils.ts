import { db } from '@/lib/firebase'
import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import {
  collection,
  getAggregateFromServer,
  getCountFromServer,
  getDocs,
  query,
  sum,
  Timestamp,
  where,
} from 'firebase/firestore'

export type Period = 'current-month' | 'last-month' | 'all-time'

export interface PerformanceStats {
  totalUnitsStaked: number
  netUnits: number
  hitRate: number
  roi: number
  wins: number
  losses: number
  pushes: number
  voids: number
}

export interface SportBreakdown {
  sport: string
  wins: number
  losses: number
  pushes: number
  netUnits: number
  roi: number
  totalStaked: number
}

// Known sports from your application
export const KNOWN_SPORTS = ['cricket', 'football', 'tennis']

export function getDateRangeForPeriod(period: Period): {
  start: Date | null
  end: Date | null
} {
  const now = new Date()

  switch (period) {
    case 'current-month':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      }
    case 'last-month': {
      const lastMonth = subMonths(now, 1)
      return {
        start: startOfMonth(lastMonth),
        end: endOfMonth(lastMonth),
      }
    }
    case 'all-time':
      return {
        start: null,
        end: null,
      }
  }
}

export function buildBaseQuery(start: Date | null, end: Date | null) {
  const baseCollection = collection(db, 'picks')

  if (start && end) {
    return query(
      baseCollection,
      where('postedAt', '>=', Timestamp.fromDate(startOfDay(start))),
      where('postedAt', '<=', Timestamp.fromDate(endOfDay(end))),
    )
  }

  return query(baseCollection)
}

export async function fetchPerformanceStats(
  start: Date | null,
  end: Date | null,
): Promise<PerformanceStats> {
  const baseQuery = buildBaseQuery(start, end)

  const [
    winsSnapshot,
    lossesSnapshot,
    pushesSnapshot,
    voidsSnapshot,
    winsDocsSnapshot,
    lossesUnitsSnapshot,
    stakableUnitsSnapshot,
  ] = await Promise.all([
    // Count wins
    getCountFromServer(query(baseQuery, where('status', '==', 'WON'))),
    // Count losses
    getCountFromServer(query(baseQuery, where('status', '==', 'LOST'))),
    // Count pushes
    getCountFromServer(query(baseQuery, where('status', '==', 'PUSH'))),
    // Count voids
    getCountFromServer(query(baseQuery, where('status', '==', 'VOID'))),
    // Fetch WON documents (need odds for profit calculation)
    getDocs(query(baseQuery, where('status', '==', 'WON'))),
    // Sum units for losses
    getAggregateFromServer(query(baseQuery, where('status', '==', 'LOST')), {
      totalUnits: sum('units'),
    }),
    // Sum units for stakable picks (exclude VOID/PUSH)
    getAggregateFromServer(
      query(baseQuery, where('status', 'in', ['WON', 'LOST'])),
      { totalUnits: sum('units') },
    ),
  ])

  const wins = winsSnapshot.data().count
  const losses = lossesSnapshot.data().count
  const pushes = pushesSnapshot.data().count
  const voids = voidsSnapshot.data().count

  const lossesUnits = lossesUnitsSnapshot.data().totalUnits || 0
  const totalUnitsStaked = stakableUnitsSnapshot.data().totalUnits || 0

  // Calculate wins profit: units * (odds - 1)
  const winsProfit = winsDocsSnapshot.docs.reduce((sum, doc) => {
    const data = doc.data()
    return sum + data.units * (data.odds - 1)
  }, 0)

  // Net units = wins profit - losses units
  const netUnits = winsProfit - lossesUnits

  const hitRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0
  const roi = totalUnitsStaked > 0 ? (netUnits / totalUnitsStaked) * 100 : 0

  return {
    totalUnitsStaked,
    netUnits,
    hitRate,
    roi,
    wins,
    losses,
    pushes,
    voids,
  }
}

export async function fetchSportBreakdown(
  start: Date | null,
  end: Date | null,
): Promise<SportBreakdown[]> {
  const baseQuery = buildBaseQuery(start, end)

  // For each sport, make parallel aggregation queries
  const sportBreakdowns = await Promise.all(
    KNOWN_SPORTS.map(async (sport) => {
      const sportQuery = query(baseQuery, where('sport', '==', sport))

      // Run parallel aggregations for this sport
      const [
        winsCount,
        lossesCount,
        pushesCount,
        winsData,
        lossesUnits,
        stakableUnits,
      ] = await Promise.all([
        getCountFromServer(query(sportQuery, where('status', '==', 'WON'))),
        getCountFromServer(query(sportQuery, where('status', '==', 'LOST'))),
        getCountFromServer(query(sportQuery, where('status', '==', 'PUSH'))),
        getDocs(query(sportQuery, where('status', '==', 'WON'))),
        getAggregateFromServer(
          query(sportQuery, where('status', '==', 'LOST')),
          { totalUnits: sum('units') },
        ),
        getAggregateFromServer(
          query(sportQuery, where('status', 'in', ['WON', 'LOST'])),
          { totalUnits: sum('units') },
        ),
      ])

      const wins = winsCount.data().count
      const losses = lossesCount.data().count
      const pushes = pushesCount.data().count

      // Skip sports with no picks
      if (wins === 0 && losses === 0 && pushes === 0) {
        return null
      }

      // Calculate wins profit
      const winsProfit = winsData.docs.reduce((sum, doc) => {
        const data = doc.data()
        return sum + data.units * (data.odds - 1)
      }, 0)

      const lossesAmount = lossesUnits.data().totalUnits || 0
      const netUnits = winsProfit - lossesAmount

      const totalStaked = stakableUnits.data().totalUnits || 0
      const roi = totalStaked > 0 ? (netUnits / totalStaked) * 100 : 0

      return {
        sport,
        wins,
        losses,
        pushes,
        netUnits,
        roi,
        totalStaked,
      }
    }),
  )

  return sportBreakdowns
    .filter((breakdown): breakdown is SportBreakdown => breakdown !== null)
    .sort((a, b) => b.netUnits - a.netUnits)
}
