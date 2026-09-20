type ToggleKey = 'first' | 'middle' | 'surname' | 'title'

type ToggleGroupProps = {
  opts: Record<ToggleKey, boolean>
  onToggle: (key: ToggleKey) => void
}

export default function ToggleGroup({ opts, onToggle }: ToggleGroupProps) {
  const items: Array<{ key: ToggleKey; label: string }> = [
    { key: 'first', label: 'First name' },
    { key: 'middle', label: 'Middle name' },
    { key: 'surname', label: 'Surname' },
    { key: 'title', label: 'Title' },
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
