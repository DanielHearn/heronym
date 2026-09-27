type ToggleKey = 'first' | 'middle' | 'surname' | 'title'

type ToggleGroupProps = {
  opts: Record<ToggleKey, boolean>
  onToggle: (key: ToggleKey) => void
  // false for a theme with no `calling` axis — the Title toggle has
  // nothing to draw from, so it's left out rather than shown disabled.
  titleEnabled?: boolean
}

export default function ToggleGroup({ opts, onToggle, titleEnabled = true }: ToggleGroupProps) {
  const items: Array<{ key: ToggleKey; label: string }> = [
    { key: 'first', label: 'First name' },
    { key: 'middle', label: 'Middle name' },
    { key: 'surname', label: 'Surname' },
    ...(titleEnabled ? [{ key: 'title' as ToggleKey, label: 'Title' }] : []),
  ]

  return (
    <div className="toggles">
      {items.map(({ key, label }) => (
        <label className="toggle" key={key}>
          <input type="checkbox" checked={opts[key]} onChange={() => onToggle(key)} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  )
}
