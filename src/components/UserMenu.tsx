import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // redireciona após logout
  };

  return (
    <div className="relative">
      <button
        onClick={() => setMenuAberto((prev) => !prev)}
        className="flex items-center gap-2 text-blue-700 font-semibold hover:underline"
      >
        {user?.nome}
        <ChevronDown size={18} />
      </button>

      {menuAberto && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
