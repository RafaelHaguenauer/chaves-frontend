type UserCardProps = { name: string; email: string; avatarUrl?: string; status?: 'ativo' | 'inativo' }
const UserCard = ({ name, email, avatarUrl, status = 'ativo' }: UserCardProps) => (
  <div className="flex items-center gap-4 bg-white rounded shadow p-4 border w-full max-w-md">
    {avatarUrl ? (
      <img src={avatarUrl} alt={name} className="w-14 h-14 rounded-full object-cover" />
    ) : (
      <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700">
        {name[0]}
      </div>
    )}
    <div className="flex-1">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-600 text-sm">{email}</div>
      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{status}</span>
    </div>
  </div>
)
export default UserCard
