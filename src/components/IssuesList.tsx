interface IssuesListProps {
  issues: string[]
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (issues.length === 0) return null

  return (
    <div className="space-y-3 w-full">
      <h3 className="text-sm sm:text-base font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
        <span style={{ color: '#dc2626' }}>✕</span> Issues Found
      </h3>
      <ul className="space-y-2">
        {issues.map((issue, i) => (
          <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
            <span>{issue}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
