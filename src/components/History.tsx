interface HistoryProps {
  onClose: () => void
}

export default function History({ onClose }: HistoryProps) {
  const history = JSON.parse(localStorage.getItem('ephpha-history') || '[]')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-stone-800 mb-6">📋 History</h2>
        {history.length === 0 ? (
          <p className="text-stone-500">No analysis history yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item: any, i: number) => (
              <li key={i} className="p-4 bg-stone-50 rounded-xl">
                <p className="font-medium text-stone-800 truncate">{item.subject}</p>
                <p className="text-sm text-stone-500">Score: {item.score} • {new Date(item.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
