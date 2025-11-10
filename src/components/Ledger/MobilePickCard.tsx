import { format } from 'date-fns'
import { statusColorMap, type Pick } from '../entry'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MobilePickCard({ pick }: { pick: Pick }) {
  return (
    <Card className="mb-3">
      <CardContent className="pt-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {format(pick.postedAt, 'MMM d, yyyy')}
            </p>
            <p className="font-medium text-sm">{pick.event}</p>
            <p className="text-xs text-muted-foreground mt-1">{pick.sport}</p>
          </div>
          <Badge className={`${statusColorMap[pick.status]} text-white`}>
            {pick.status}
          </Badge>
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market:</span>
            <span>{pick.market}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selection:</span>
            <span>{pick.selection}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Odds:</span>
            <span className="font-medium">{pick.odds.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Units:</span>
            <span className="font-medium">{pick.units}</span>
          </div>
          {pick.finalScore && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Score:</span>
              <span>{pick.finalScore}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
