const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-1 mt-auto w-full border-t border-gray-300">
      <div className="flex flex-col items-center gap-1">
        <img
          src="/cefet-logo.png"
          alt="Logo CEFET"
          className="h-8 object-contain"
        />
        <p className="text-xs text-gray-700 font-medium">
          Rafael Moura, Junior Santos, Eikei Vieira e João Pedro
        </p>
        <p className="text-xs text-gray-500">
          CEFET/RJ - Unidade Maria da Graça
        </p>
      </div>
    </footer>
  )
}

export default Footer
