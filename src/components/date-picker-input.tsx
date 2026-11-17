import * as React from "react"
import { Field } from "./ui/field"
import { Label } from "./ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { IconCalendar } from "@tabler/icons-react"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function DatePickerInput({
  id,
  name
}: {
    id: string,
    name: string
  }) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(
      undefined
    )
    const [month, setMonth] = React.useState<Date | undefined>(undefined)
    const [value, setValue] = React.useState("")

    return (
      <InputGroup>
        <InputGroupInput
            id={id}
            name={name}
            value={value}
            placeholder={formatDate(new Date()).toString()}
            onChange={(e) => {
              const next = e.target.value
              setValue(next)
              if (!next.trim()) { setDate(undefined); setMonth(undefined); return }
              const parsed = new Date(next)
              if (isValidDate(parsed)) { setDate(parsed); setMonth(parsed) }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger render={
                <InputGroupButton id="date-picker" variant="ghost" size="icon-xs" aria-label="Select date">
                  <IconCalendar />
                  <span className="sr-only">
                    Select date
                  </span>
                </InputGroupButton>
              } />
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(date) => {
                    setDate(date)
                    setValue(formatDate(date))
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
      </InputGroup>
    )
}
