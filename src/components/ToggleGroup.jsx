export default function ToggleGroup({ opts, onToggle }) {
  const items = [
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
