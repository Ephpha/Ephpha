interface SuggestionsListProps {
  suggestions: string[]
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="space-y-3 w-full">
      <h3 className="text-sm sm:text-base font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
        💡 Suggestions
      </h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            <span className="text-amber-500 flex-shrink-0">✓</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
