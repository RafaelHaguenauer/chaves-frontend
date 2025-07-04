import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import UserMenu from '@/components/UserMenu';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <main className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-end mb-4">
              <UserMenu />
            </div>

            <h1 className="text-2xl font-bold text-blue-700">Bem-vindo ao MAPUB!</h1>
            <p className="text-gray-700 mt-2">
              Escolha uma funcionalidade no menu lateral para começar.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
