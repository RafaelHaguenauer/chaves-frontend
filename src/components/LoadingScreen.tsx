const LoadingScreen = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30, 41, 59, 0.7)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.3s',
    }}
  >
    <img
      src="/gif-loading-car.gif"
      alt="Carregando..."
      style={{
        width: 120,
        height: 120,
        marginBottom: 24,
        filter: 'drop-shadow(0 0 16px #2563eb)',
        animation: 'pulse 1.2s infinite',
      }}
    />
    <span
      style={{
        color: '#fff',
        fontSize: 24,
        fontWeight: 600,
        textShadow: '0 2px 8px #1e293b',
        letterSpacing: 1,
      }}
    >
      Carregando...
    </span>
    <style>
      {`
        @keyframes pulse {
          0% { transform: scale(1);}
          50% { transform: scale(1.08);}
          100% { transform: scale(1);}
        }
      `}
    </style>
  </div>
)

export default LoadingScreen