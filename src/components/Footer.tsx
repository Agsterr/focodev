import Link from 'next/link'

export default async function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-muted-light dark:bg-muted-dark">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold mb-2">FocoDev Sistemas</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Soluções digitais modernas e seguras.</p>
        </div>
        <div>
          <div className="text-lg font-semibold mb-2">Links</div>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-brand" href="/">Home</Link></li>
            <li><Link className="hover:text-brand" href="/projects">Portfólio</Link></li>
            <li><Link className="hover:text-brand" href="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-lg font-semibold mb-2">Contato</div>
          <ul className="space-y-2 text-sm">
            <li>Email: contato@focodev.com</li>
            <li>Instagram: @{process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'focodev'}</li>
          </ul>
        </div>
      </div>
      <div className="container pb-10 text-sm text-gray-500">© {new Date().getFullYear()} FocoDev Sistemas</div>
    </footer>
  )
}
