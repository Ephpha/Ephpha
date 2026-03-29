interface SuggestionsListProps {
  suggestions: string[]
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-stone-800">💡 Suggestions</h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-600">
            <span className="text-amber-500">✓</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
