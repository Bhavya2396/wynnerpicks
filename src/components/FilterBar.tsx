import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PickStatus } from './entry'

interface FilterBarProps {
  sportFilter: string
  statusFilter: string
  onSportChange: (value: string) => void
  onStatusChange: (value: PickStatus | 'All') => void
}

export default function FilterBar({
  sportFilter,
  statusFilter,
  onSportChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-4 p-4 glass-card rounded-lg mb-6">
      <div className="flex-1">
        <label className="text-sm font-medium mb-2 block text-white">Sport</label>
        <Select value={sportFilter} onValueChange={onSportChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Sports</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium mb-2 block text-white">Status</label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="WON">Won</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
            <SelectItem value="PUSH">Push</SelectItem>
            <SelectItem value="VOID">Void</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
