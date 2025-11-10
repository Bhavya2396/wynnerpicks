import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  fetchPerformanceStats,
  fetchSportBreakdown,
  getDateRangeForPeriod,
  type PerformanceStats,
  type Period,
  type SportBreakdown,
} from '@/components/Performance/utils'

export const Route = createFileRoute('/performace')({
  component: PerformancePage,
})

function PerformancePage() {
  const [stats, setStats] = useState<PerformanceStats | null>(null)
  const [sportBreakdown, setSportBreakdown] = useState<SportBreakdown[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<Period>('current-month')

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true)

      try {
        const { start, end } = getDateRangeForPeriod(period)

        const [performanceStats, breakdown] = await Promise.all([
          fetchPerformanceStats(start, end),
          fetchSportBreakdown(start, end),
        ])

        setStats(performanceStats)
        setSportBreakdown(breakdown)
      } catch (error) {
        console.error('Error fetching performance data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformanceData()
  }, [period])

  const getPeriodLabel = (p: Period): string => {
    switch (p) {
      case 'current-month':
        return 'This Month'
      case 'last-month':
        return 'Last Month'
      case 'all-time':
        return 'All Time'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">Performance Analytics</h1>
            <p className="text-gray-300">
              Comprehensive performance tracking and analytics dashboard
            </p>
          </div>

        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      ) : !stats ||
        (stats.wins === 0 && stats.losses === 0 && stats.pushes === 0) ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No picks found for {getPeriodLabel(period).toLowerCase()}.
          </p>
        </div>
      ) : (
        <>
          {/* Top Stat Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Units Staked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stats.totalUnitsStaked.toFixed(1)}
                </div>
                <p className="text-sm text-blue-300 mt-2">
                  {stats.wins + stats.losses + stats.pushes} picks
                </p>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${
                    stats.netUnits > 0
                      ? 'text-green-400'
                      : stats.netUnits < 0
                        ? 'text-red-400'
                        : 'text-white'
                  }`}
                >
                  {stats.netUnits > 0 ? '+' : ''}
                  {stats.netUnits.toFixed(2)}
                </div>
                <p className="text-sm text-blue-300 mt-2">
                  {stats.wins}W - {stats.losses}L - {stats.pushes}P
                </p>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Hit Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stats.hitRate.toFixed(1)}%
                </div>
                <p className="text-sm text-blue-300 mt-2">
                  Win percentage
                </p>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${
                    stats.roi > 0
                      ? 'text-green-400'
                      : stats.roi < 0
                        ? 'text-red-400'
                        : 'text-white'
                  }`}
                >
                  {stats.roi > 0 ? '+' : ''}
                  {stats.roi.toFixed(1)}%
                </div>
                <p className="text-sm text-blue-300 mt-2">
                  Return on investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sport Breakdown */}
          {sportBreakdown.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Performance by Sport</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sportBreakdown.map((sport) => (
                    <div
                      key={sport.sport}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-sm capitalize">
                          {sport.sport}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {sport.wins}W - {sport.losses}L - {sport.pushes}P
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Net Units
                          </div>
                          <div
                            className={`text-sm font-semibold ${
                              sport.netUnits > 0
                                ? 'text-green-600'
                                : sport.netUnits < 0
                                  ? 'text-red-600'
                                  : ''
                            }`}
                          >
                            {sport.netUnits > 0 ? '+' : ''}
                            {sport.netUnits.toFixed(2)}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            ROI
                          </div>
                          <div
                            className={`text-sm font-semibold ${
                              sport.roi > 0
                                ? 'text-green-600'
                                : sport.roi < 0
                                  ? 'text-red-600'
                                  : ''
                            }`}
                          >
                            {sport.roi > 0 ? '+' : ''}
                            {sport.roi.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      </div>
    </div>
  )
}
