import PinIcon from './PinIcon.jsx'

export default function Ledger({
  title,
  items,
  isPinned,
  onTogglePin,
  onUnpin,
  emptyText,
  className = '',
}) {
  return (
    <div className={`ledger ${className}`.trim()}>
      <h3>{title}</h3>
      {items.length ? (
        <ul className="ledger-list">
          {items.map((item) => {
            const pinned = isPinned(item.id)
            const handlePinClick = onUnpin ? () => onUnpin(item.id) : () => onTogglePin(item)

            return (
              <li key={item.id}>
                <span className="lname">{item.full || '(empty)'}</span>
                <span className="ltag">
                  {item.raceLabel} {item.classLabel}
                </span>
                <button
                  className={`row-pin${pinned ? ' pinned' : ''}`}
                  onClick={handlePinClick}
                  aria-label={onUnpin ? 'Unpin this name' : pinned ? 'Unpin this name' : 'Pin this name'}
                  title={onUnpin ? 'Unpin' : pinned ? 'Unpin' : 'Pin for safekeeping'}
                >
                  <PinIcon filled={onUnpin ? true : pinned} />
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-ledger">{emptyText}</div>
      )}
    </div>
  )
}
