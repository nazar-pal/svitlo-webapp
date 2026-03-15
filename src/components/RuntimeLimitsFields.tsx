import { FieldError, Label, NumberField, Slider } from '@heroui/react'

interface RuntimeLimitsFieldsProps {
  maxRunHours: number | null
  onMaxRunHoursChange: (v: number | null) => void
  restHours: number | null
  onRestHoursChange: (v: number | null) => void
  warningPct: number
  onWarningPctChange: (v: number) => void
}

export default function RuntimeLimitsFields({
  maxRunHours,
  onMaxRunHoursChange,
  restHours,
  onRestHoursChange,
  warningPct,
  onWarningPctChange
}: RuntimeLimitsFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          isRequired
          step={0.5}
          value={maxRunHours ?? undefined}
          onChange={v => onMaxRunHoursChange(v)}
        >
          <Label>Max run hours</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
          <FieldError />
        </NumberField>

        <NumberField
          isRequired
          step={0.5}
          value={restHours ?? undefined}
          onChange={v => onRestHoursChange(v)}
        >
          <Label>Rest hours</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
          <FieldError />
        </NumberField>
      </div>

      <Slider
        minValue={1}
        maxValue={100}
        step={1}
        value={warningPct}
        onChange={v => onWarningPctChange(v as number)}
      >
        <Label>Warning threshold</Label>
        <Slider.Output>
          {({ state }) => `${state.getThumbValueLabel(0)}%`}
        </Slider.Output>
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <p className="text-muted -mt-2 text-xs">
        Alert when runtime reaches this percentage.
      </p>
    </>
  )
}
