interface HistoryItem {
  tool: 'analyze' | 'write'
  subject?: string
  goal?: string
  score: number
  date: string
}

interface HistoryProps {
  onClose: () => void
}

export default function History({ onClose }: HistoryProps) {
  const history: HistoryItem[] = JSON.parse(localStorage.getItem('ephpha-history') || '[]')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md relative max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-8 pb-4 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800">📋 History</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto px-5 sm:px-8 pb-6 flex-1">
          {history.length === 0 ? (
            <p className="text-stone-400 text-center py-8">No history yet</p>
          ) : (
            <ul className="space-y-3">
              {history.map((item: HistoryItem, i: number) => (
                <li key={i} className="p-3 sm:p-4 bg-stone-50 rounded-xl">
                  {/* Tool badge */}
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      backgroundColor: item.tool === 'write' ? '#fef3c7' : '#fce7f3',
                      color: item.tool === 'write' ? '#92400e' : '#9d174d',
                    }}>
                      {item.tool === 'write' ? '✍️ Writer' : '⚡ Analyzer'}
                    </span>
                  </div>
                  <p className="font-medium text-stone-800 truncate text-sm sm:text-base">
                    {item.tool === 'write' ? item.goal : item.subject}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Score: <span className="font-semibold">{item.score}</span> · {new Date(item.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
