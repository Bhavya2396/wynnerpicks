import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BarChart3, Shield, TrendingUp, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                WynnerPicks
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A data-driven sports insights platform built around one simple idea:{' '}
              <span className="font-semibold text-blue-300">accountability</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold">
                  Enter Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/live-feed">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-white/20 text-white hover:bg-white/10">
                  View Live Feed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">ABOUT US</h2>
        </div>

        <div className="prose prose-lg max-w-none space-y-12">
          <div className="text-lg leading-relaxed text-gray-100">
            <p>
              In a space crowded with loud predictions and unverifiable claims,
              we're bringing clarity, structure, and math to sports betting
              advice. Every pick we post is time-stamped, publicly logged, and
              fully trackable in our results ledger. You can see exactly when a
              pick was released and how it performed — no editing, no hiding, no
              cherry-picking.
            </p>
          </div>

          <div className="text-lg leading-relaxed text-gray-100">
            <p>
              We operate on a defined structure: a maximum of{' '}
              <span className="font-semibold text-blue-300">200 units advised per month</span>.
              Our goal is to maintain a consistent{' '}
              <span className="font-semibold text-blue-300">20% return</span> on those units —
              that's the performance benchmark we measure ourselves against.
              Whether you're a casual bettor or a disciplined investor in sports
              analytics, our objective is the same: to build a transparent track
              record you can verify for yourself.
            </p>
          </div>

          <div className="text-lg leading-relaxed text-gray-100">
            <p>
              What makes us different isn't just our results — it's our openness.
              We don't claim perfection; we publish proof. Every decision, every
              pick, every outcome lives on the record. That's how real edge is
              built: through trust, data, and performance.
            </p>
          </div>

          <div className="text-lg leading-relaxed text-gray-100">
            <p>
              Follow our picks, track the numbers, and watch the margin play out
              in real time.
            </p>
          </div>

          <div className="text-center text-xl font-semibold my-12">
            <p className="text-blue-300 text-2xl">No smoke. No mirrors. Just results you can verify.</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
            <p className="text-gray-300">Every pick is public, time-stamped, and permanently recorded</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
            <p className="text-gray-300">Targeting consistent 20% ROI with disciplined unit management</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
            <p className="text-gray-300">Data-driven insights with comprehensive performance tracking</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
            <p className="text-gray-300">Join others who value accountability and proven results</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-12 text-white text-center">How It Works</h2>

          <div className="space-y-10">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">1. Pick Release</h3>
              <p className="text-lg leading-relaxed text-gray-100">
                Before every event, we publish our official pick right here on
                the site — including the sport, matchup, bet type, odds, and the
                number of units we're advising to play.
              </p>
            </div>

            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">2. Follow Along</h3>
              <p className="text-lg leading-relaxed text-gray-100">
                Each pick is posted publicly and time-stamped. You can view it
                live in the feed as it's released, and monitor all open picks in
                real time.
              </p>
            </div>

            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">3. Result Update</h3>
              <p className="text-lg leading-relaxed mb-2 text-gray-100">
                Once the event ends, the outcome is recorded in our ledger for
                everyone to see — win, loss, or push.
              </p>
              <p className="text-lg leading-relaxed text-gray-100">
                Nothing gets deleted or changed. Every result stays on record so
                you can verify performance yourself.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 py-16">
          <p className="text-lg leading-relaxed mb-6 text-gray-100">
            Our model runs on transparency — every pick, every outcome, every
            unit. That's how we measure our 20% edge and keep ourselves
            accountable to the numbers.
          </p>
          <p className="text-xl font-semibold text-blue-300 mb-8">
            We don't talk about results — we show them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold">
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/ledger">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-white/20 text-white hover:bg-white/10">
                View Our Record
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
