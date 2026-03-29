import ScoreCard from './ScoreCard'
import IssuesList from './IssuesList'
import SuggestionsList from './SuggestionsList'
import AlternativesList from './AlternativesList'

interface AnalysisResult {
  score: number
  issues: string[]
  suggestions: string[]
  alternatives: string[]
}

interface ResultsProps {
  result: AnalysisResult
  onCopy: (text: string) => void
}

export default function Results({ result, onCopy }: ResultsProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-8">
        <ScoreCard score={result.score} />
        {/* FIX 2: AI Alternatives first */}
        <AlternativesList alternatives={result.alternatives} onCopy={onCopy} />
        <IssuesList issues={result.issues} />
        <SuggestionsList suggestions={result.suggestions} />
      </div>
    </div>
  )
}
