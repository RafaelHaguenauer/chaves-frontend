type ShareButtonProps = { link: string }
const ShareButton = ({ link }: ShareButtonProps) => (
  <a
    href={`https://wa.me/?text=${encodeURIComponent(link)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Compartilhar no WhatsApp
  </a>
)
export default ShareButton
