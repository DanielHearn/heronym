const COMPLEXITY_LABELS = ['Brief', 'Modest', 'Balanced', 'Ornate', 'Grand']

export default function ComplexityControl({ value, onChange }) {
  return (
    <div className="field" style={{ marginBottom: '8px' }}>
      <div className="complexity-row">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="complexity-slider"
          aria-label="Name complexity"
        />
        <span className="complexity-value">{COMPLEXITY_LABELS[value - 1]}</span>
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
