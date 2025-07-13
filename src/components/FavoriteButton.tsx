import { useState } from 'react'
type Props = { initial?: boolean; onChange?: (fav: boolean) => void }
const FavoriteButton = ({ initial = false, onChange }: Props) => {
  const [fav, setFav] = useState(initial)
  const toggle = () => {
    setFav(f => { onChange?.(!f); return !f })
  }
  return (
    <button onClick={toggle} aria-pressed={fav} className="text-yellow-500 text-2xl">
      {fav ? '★' : '☆'}
    </button>
  )
}
export default FavoriteButton
