import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { Pick } from './entry'
import { format } from 'date-fns'

interface PickDetailModalProps {
  pick: Pick | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PickDetailModal({
  pick,
  open,
  onOpenChange,
}: PickDetailModalProps) {
  if (!pick) return null

  const statusColor = {
    PENDING: 'bg-gray-500',
    WON: 'bg-green-600',
    LOST: 'bg-red-600',
    PUSH: 'bg-gray-400',
    VOID: 'bg-gray-400',
  }[pick.status]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4 mt-4">
            <DialogTitle className="text-2xl">{pick.event}</DialogTitle>
            <Badge className={`${statusColor} text-white`}>{pick.status}</Badge>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{pick.sport}</Badge>
            <Badge variant="outline">{pick.league}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Market</p>
              <p className="font-semibold">{pick.market}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selection</p>
              <p className="font-semibold">{pick.selection}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Odds</p>
              <p className="font-semibold">{pick.odds.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Units</p>
              <p className="font-semibold text-cyan-600">{pick.units}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Posted At</p>
            <p className="font-semibold">
              {format(pick.postedAt, 'MMMM d, yyyy h:mm a')}
            </p>
          </div>

          {pick.settledAt && (
            <div>
              <p className="text-sm text-muted-foreground">Settled At</p>
              <p className="font-semibold">
                {format(pick.settledAt, 'MMMM d, yyyy h:mm a')}
              </p>
            </div>
          )}

          {pick.finalScore && (
            <div>
              <p className="text-sm text-muted-foreground">Final Score</p>
              <p className="font-semibold">{pick.finalScore}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground mb-2">Rationale</p>
            <p className="text-sm leading-relaxed">{pick.rationale}</p>
          </div>

          {pick.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Notes</p>
              <p className="text-sm leading-relaxed italic">{pick.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
