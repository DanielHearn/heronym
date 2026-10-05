import PinIcon from '../PinIcon'
import './Ledger.less'

export type LedgerItem = {
  id: string
  full: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel?: string
}

type LedgerProps = {
  title: string
  items: LedgerItem[]
  isPinned: (id: string) => boolean
  onSelect: (item: LedgerItem) => void
  onTogglePin?: (item: LedgerItem) => void
  onUnpin?: (id: string) => void
  emptyText: string
  className?: string
  maxItems?: number
}

export default function Ledger({
  title,
  items,
  isPinned,
  onSelect,
  onTogglePin,
  onUnpin,
  emptyText,
  className = '',
  maxItems,
}: LedgerProps) {
  const displayedItems = maxItems !== undefined ? items.slice(0, maxItems) : items

  return (
    <div className={`ledger ${className}`.trim()}>
      <h3>{title}</h3>
      {displayedItems.length ? (
        <ul className="ledger-list">
          {displayedItems.map((item) => {
            const pinned = isPinned(item.id)
            const handlePinClick = onUnpin ? () => onUnpin(item.id) : () => onTogglePin?.(item)

            return (
              <li key={item.id}>
                <button
                  className="lname"
                  type="button"
                  onClick={() => onSelect(item)}
                  aria-label={`Load ${item.full} into the name display`}
                  title={`Load ${item.full}`}
                >
                  <div>
                    <span className="lname-text">{item.full || '(empty)'}</span>
                    <span className="ltag">
                      {item.callingLabel
                        ? `${item.lineageLabel} · ${item.callingLabel}`
                        : item.lineageLabel}
                    </span>
                  </div>

                  <span className="load-hint" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M14 4h5v16h-5M3 12h11m-4-4 4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                    Load
                  </span>
                </button>

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
