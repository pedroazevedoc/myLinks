import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-mauve-900 text-mauve-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Página não encontrada</p>
      <Link 
        to="/"
        className="px-4 py-2 bg-mauve-700 text-mauve-100 rounded hover:bg-mauve-600 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}