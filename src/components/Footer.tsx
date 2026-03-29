function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #f1f0ef', backgroundColor: 'white' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-4 flex items-center justify-between">
        <span style={{ fontSize: '13px', color: '#a8a29e', fontWeight: 500 }}>
          Ephpha{' '}
          <span style={{
            background: 'linear-gradient(to right, #dc2626, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
          }}>©</span>{' '}
          2026
        </span>

        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="https://www.instagram.com/ephpha.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#dc2626')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com/EphphaMail"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f97316')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on X"
          >
            <XIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
