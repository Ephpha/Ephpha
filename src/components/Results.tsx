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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
        <ScoreCard score={result.score} />
        <IssuesList issues={result.issues} />
        <SuggestionsList suggestions={result.suggestions} />
        <AlternativesList alternatives={result.alternatives} onCopy={onCopy} />
      </div>
    </div>
  )
}
