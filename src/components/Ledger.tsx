import PinIcon from './PinIcon'

export type LedgerItem = {
  id: string
  full: string
  raceLabel: string
  classLabel: string
}

type LedgerProps = {
  title: string
  items: LedgerItem[]
  isPinned: (id: string) => boolean
  onTogglePin?: (item: LedgerItem) => void
  onUnpin?: (id: string) => void
  emptyText: string
  className?: string
}

export default function Ledger({
  title,
  items,
  isPinned,
  onTogglePin,
  onUnpin,
  emptyText,
  className = '',
}: LedgerProps) {
  return (
    <div className={`ledger ${className}`.trim()}>
      <h3>{title}</h3>
      {items.length ? (
        <ul className="ledger-list">
          {items.map((item) => {
            const pinned = isPinned(item.id)
            const handlePinClick = onUnpin ? () => onUnpin(item.id) : () => onTogglePin?.(item)

            return (
              <li key={item.id}>
                <span className="lname">{item.full || '(empty)'}</span>
                <span className="ltag">
                  {item.raceLabel} {item.classLabel}
                </span>
                <button
                  className={`row-pin${pinned ? ' pinned' : ''}`}
                  onClick={handlePinClick}
                  aria-label={
                    onUnpin ? 'Unpin this name' : pinned ? 'Unpin this name' : 'Pin this name'
                  }
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
