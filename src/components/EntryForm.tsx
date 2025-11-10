import * as z from 'zod'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from './ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PICKS_COLLECTION } from './entry'

const betStatusSchema = z.enum(['PENDING', 'WON', 'LOST', 'PUSH', 'VOID'])

const betSchema = z.object({
  sport: z.string().min(2),
  league: z.string().min(2),
  event: z.string().min(2),
  market: z.string().min(2),
  selection: z.string().min(2),
  odds: z.number().min(0),
  units: z.number().min(0),
  status: betStatusSchema,
  rationale: z.string(),
  finalScore: z.string(),
  notes: z.string().max(2000),
})

const BASE_DEFAULT_VALUES = {
  sport: '',
  league: '',
  event: '',
  market: '',
  selection: '',
  odds: 1.0,
  units: 10,
  status: 'PENDING',
  rationale: '',
  finalScore: '',
  notes: '',
}

interface EntryFormProps {
  initialData?: Partial<typeof BASE_DEFAULT_VALUES> & {
    id?: string
  }
  mode?: 'create' | 'edit'
}

export default function EntryForm({
  initialData,
  mode = 'create',
}: EntryFormProps) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: initialData
      ? {
          sport: initialData.sport || '',
          league: initialData.league || '',
          event: initialData.event || '',
          market: initialData.market || '',
          selection: initialData.selection || '',
          odds: initialData.odds || 1.0,
          units: initialData.units || 10,
          status: initialData.status || 'PENDING',
          rationale: initialData.rationale || '',
          finalScore: initialData.finalScore || '',
          notes: initialData.notes || '',
        }
      : BASE_DEFAULT_VALUES,
    validators: {
      onSubmit: betSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (mode === 'edit' && initialData?.id) {
          const docRef = doc(db, PICKS_COLLECTION, initialData.id)
          await updateDoc(docRef, {
            ...value,
            settledAt: ['WON', 'LOST', 'PUSH', 'VOID'].includes(value.status)
              ? serverTimestamp()
              : null,
          })
          toast.success('Pick updated successfully!')
          navigate({ to: '/ledger' })
        } else {
          await addDoc(collection(db, PICKS_COLLECTION), {
            ...value,
            postedAt: serverTimestamp(),
            settledAt: null,
          })
          toast.success('Pick created successfully!')
          form.reset()
        }
      } catch (error) {
        console.error(error)
        toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} pick`)
      }
    },
  })

  return (
    <div className="glass-card p-6 rounded-xl">
      <form
        id="bet-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="sport"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Sport</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Sport"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="league"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>League</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="League"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="event"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Event</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Event"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="market"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Market</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Market"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="selection"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Selection</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Selection"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="odds"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Odds</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                    aria-invalid={isInvalid}
                    placeholder="Odds"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="units"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Units</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                    aria-invalid={isInvalid}
                    placeholder="Units"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="status"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                      <SelectValue defaultValue="PENDING" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="WON">Won</SelectItem>
                        <SelectItem value="LOST">Lost</SelectItem>
                        <SelectItem value="PUSH">Push</SelectItem>
                        <SelectItem value="VOID">Void</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="rationale"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rationale</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Rationale"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="finalScore"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Final Score</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Final Score"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="notes"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Description for the bet"
                      rows={6}
                      className="min-h-24 resize-y"
                      aria-invalid={isInvalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value.length}/2000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>

      <Field orientation="horizontal" className="mt-4">
        {mode === 'edit' ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/ledger' })}
            >
              Cancel
            </Button>
            <Button type="submit" form="bet-form">
              Update
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="bet-form">
              Submit
            </Button>
          </>
        )}
      </Field>
    </div>
  )
}
