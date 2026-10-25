type LockIconProps = {
  locked: boolean
}

export default function LockIcon({ locked }: LockIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {locked ? (
        <path
          d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12a1 1 0 0 1 1 1v9H5v-9a1 1 0 0 1 1-1Zm6 4v3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      ) : (
        <path
          d="M7 10V7a5 5 0 0 1 9.6-2m1.4 5h-12a1 1 0 0 0-1 1v9h14v-9a1 1 0 0 0-1-1Zm-7 4v3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      )}
    </svg>
  )
}
