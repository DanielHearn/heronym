type FieldSelectOption = {
  value: string
  label: string
}

type FieldSelectProps = {
  label: string
  id: string
  value: string
  options: FieldSelectOption[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function FieldSelect({ label, id, value, options, onChange }: FieldSelectProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
