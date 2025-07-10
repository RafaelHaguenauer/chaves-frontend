import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { BookOpen, Users, Code } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
            Bem-vindo ao Sistema de Manutenções Públicas
          </h1>

          <section className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl text-center border border-gray-200">
            <div className="flex flex-col md:flex-row justify-around items-center gap-6">
              <div className="flex flex-col items-center">
                <Users className="text-blue-700 mb-2" size={40} />
                <p className="font-semibold text-blue-800">Desenvolvido por:</p>
                <p className="text-sm text-gray-700">
                  Rafael Moura, Junior Santos, Eike Vieira e João Pedro
                </p>
              </div>

              <div className="flex flex-col items-center">
                <BookOpen className="text-blue-700 mb-2" size={40} />
                <p className="font-semibold text-blue-800">Instituição:</p>
                <p className="text-sm text-gray-700">
                  CEFET/RJ - Unidade Maria da Graça
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Code className="text-blue-700 mb-2" size={40} />
                <p className="font-semibold text-blue-800">Propósito:</p>
                <p className="text-sm text-gray-700">
                  Projeto acadêmico com foco em aplicações públicas modernas.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage
