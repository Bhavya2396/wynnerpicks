import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Pick } from './entry'
import { format } from 'date-fns'

interface PickCardProps {
  pick: Pick
  onClick: () => void
}

const colorMap: Record<string, string> = {
  PENDING: 'bg-gray-500',
  WON: 'bg-green-600',
  LOST: 'bg-red-600',
  PUSH: 'bg-gray-400',
  VOID: 'bg-gray-400',
}

export default function PickCard({ pick, onClick }: PickCardProps) {
  const statusColor = colorMap[pick.status]

  return (
    <Card
      className="cursor-pointer glass-card hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {pick.sport}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {pick.league}
            </Badge>
          </div>
          <Badge className={`${statusColor} text-white`}>{pick.status}</Badge>
        </div>
        <h3 className="font-bold text-lg mt-2 text-white">{pick.event}</h3>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {pick.market}: {pick.selection}
          </span>
          <span className="font-semibold">@ {pick.odds.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-blue-300">{pick.units} units</span>
          <span className="text-xs text-gray-300">
            {format(pick.postedAt, 'MMM d, yyyy h:mm a')}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {pick.rationale}
        </p>
      </CardContent>
    </Card>
  )
}
