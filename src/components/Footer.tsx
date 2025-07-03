const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 text-white text-center py-4 mt-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Marca_CEFET-RJ_horizontal_branca.png"
          alt="Logo CEFET"
          className="h-10"
        />
        <p className="text-sm">
          Site desenvolvido por alunos do CEFET/RJ - Maria da Graça para estudos de
          JavaScript, TypeScript, REST, React, NestJS, entre outras tecnologias.
        </p>
        <p className="text-xs">Grupo: Rafael Moura, Junior Santos, Eike Vieira e João Pedro</p>
      </div>
    </footer>
  );
};

export default Footer;
