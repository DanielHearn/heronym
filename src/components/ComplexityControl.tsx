const COMPLEXITY_LABELS = ['Brief', 'Modest', 'Balanced', 'Ornate', 'Grand'] as const

type ComplexityControlProps = {
  value: number
  onChange: (value: number) => void
}

export default function ComplexityControl({ value, onChange }: ComplexityControlProps) {
  return (
    <div className="field" style={{ marginBottom: '8px' }}>
      <div className="complexity-row">
        <span className="complexity-value">{COMPLEXITY_LABELS[value - 1]}</span>
        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="complexity-slider"
          aria-label="Name complexity"
        />
      </div>
      <div className="complexity-ticks">
        {COMPLEXITY_LABELS.map((label, index) => (
          <span key={label} className={index + 1 === value ? 'active' : ''}>
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  )
}

export { COMPLEXITY_LABELS }
