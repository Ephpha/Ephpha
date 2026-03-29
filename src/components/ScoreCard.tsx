interface ScoreCardProps {
  score: number
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const getColor = () => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getBg = () => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  return (
