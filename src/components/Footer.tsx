const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-auto w-full border-t border-gray-300">
      <div className="flex flex-col items-center gap-2">
        <img
          src="/cefet-logo.png"
          alt="Logo CEFET"
          className="h-12 object-contain"
        />
        <p className="text-sm text-gray-800 font-semibold">
          Grupo: Rafael Moura, Junior Santos, Eikei Vieira e João Pedro
        </p>
        <p className="text-xs text-gray-600 max-w-md px-4">
          Site desenvolvido por alunos do CEFET/RJ - Unidade Maria da Graça
          para estudos de JS, TS, REST, React, NestJS, etc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
