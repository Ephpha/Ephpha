interface AlternativesListProps {
  alternatives: string[]
  onCopy: (text: string) => void
}

export default function AlternativesList({ alternatives, onCopy }: AlternativesListProps) {
  if (alternatives.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-stone-800">Alternative Subject Lines</h3>
      <ul className="space-y-2">
        {alternatives.map((alt, i) => (
          <li key={i} className="flex items-center justify-between gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
            <span className="text-stone-700 text-sm">{alt}</span>
            <button onClick={() => onCopy(alt)} className="text-xs text-amber-600 hover:text-amber-800 font-medium shrink-0 transition-colors">Copy</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
