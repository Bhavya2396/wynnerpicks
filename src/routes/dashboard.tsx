import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Activity, 
  BarChart3, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Plus, 
  Radio, 
  TrendingUp, 
  Users,
  Zap
} from 'lucide-react'
import { useAuth } from '@/lib/auth'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { isAdmin } = useAuth()
  
  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">WynnerPicks Dashboard</h1>
          <p className="text-xl text-gray-300">Your complete sports betting analytics hub</p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">Monthly Units</p>
                  <p className="text-3xl font-bold text-white">156</p>
                  <p className="text-xs text-blue-300">of 200 target</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">Win Rate</p>
                  <p className="text-3xl font-bold text-green-400">68%</p>
                  <p className="text-xs text-green-300">+12% vs target</p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">ROI</p>
                  <p className="text-3xl font-bold text-blue-400">+24.5%</p>
                  <p className="text-xs text-blue-300">above 20% target</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">Active Picks</p>
                  <p className="text-3xl font-bold text-yellow-400">3</p>
                  <p className="text-xs text-yellow-300">pending results</p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/live-feed" className="block group">
            <Card className="glass-card h-full hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Radio className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">Live Feed</CardTitle>
                    <p className="text-sm text-gray-400">Real-time picks & updates</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Track live picks as they happen. See the latest analysis, odds, and unit recommendations in real-time.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Live Updates</Badge>
                  <span className="text-sm text-blue-300">View Feed →</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/ledger" className="block group">
            <Card className="glass-card h-full hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">Complete Ledger</CardTitle>
                    <p className="text-sm text-gray-400">Full transparent history</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Browse all historical picks with detailed filtering, search, and performance tracking. Complete transparency.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">All Records</Badge>
                  <span className="text-sm text-blue-300">View Ledger →</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/performace" className="block group">
            <Card className="glass-card h-full hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">Performance Analytics</CardTitle>
                    <p className="text-sm text-gray-400">Detailed stats & insights</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Deep dive into performance metrics, ROI analysis, and sport-by-sport breakdowns with visual charts.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Analytics</Badge>
                  <span className="text-sm text-blue-300">View Stats →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity & Admin Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Tennis pick WON</p>
                    <p className="text-gray-400 text-xs">Djokovic vs Nadal • +15.6 units</p>
                  </div>
                  <Badge className="bg-green-600 text-white">WON</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">New pick posted</p>
                    <p className="text-gray-400 text-xs">Cricket • India vs Australia • 10 units</p>
                  </div>
                  <Badge className="bg-gray-500 text-white">PENDING</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Football pick LOST</p>
                    <p className="text-gray-400 text-xs">Eagles vs Cowboys • -8 units</p>
                  </div>
                  <Badge className="bg-red-600 text-white">LOST</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isAdmin && (
                  <Link to="/new-entry">
                    <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Pick
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  View Community
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Today's Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-2xl font-bold text-blue-400">3</p>
                    <p className="text-sm text-gray-400">Picks Today</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-2xl font-bold text-green-400">+42u</p>
                    <p className="text-sm text-gray-400">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

