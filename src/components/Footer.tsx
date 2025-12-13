import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-muted-light dark:bg-muted-dark">
      <div className="container py-12">
        <div className="rounded-2xl p-8 md:p-10 mb-10 bg-gradient-to-r from-brand to-brand-dark text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow">
          <div className="text-2xl md:text-3xl font-bold">Pronto para acelerar seu projeto?</div>
          <div className="flex gap-4">
            <a href="https://wa.me/16991183292?text=Ol%C3%A1,%20gostaria%20de%20fazer%20um%20or%C3%A7amento" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-white text-brand font-semibold px-6 py-3 hover:bg-white/90 transition">
              Solicitar orçamento
            </a>
            <a href="/projects" className="inline-flex items-center justify-center rounded-xl border border-white/60 text-white font-semibold px-6 py-3 hover:bg-white/10 transition">
              Ver portfólio
            </a>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold mb-2">FocoDev Sistemas</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Soluções digitais modernas e seguras.</p>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">Links</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-brand transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-brand transition-colors" href="/projects">Portfólio</Link></li>
              <li><Link className="hover:text-brand transition-colors" href="/#servicos">Serviços</Link></li>
              <li><Link className="hover:text-brand transition-colors" href="/#contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">Contato</div>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{' '}
                <a href="mailto:focodevsistemas@gmail.com" className="hover:text-brand transition-colors">
                  focodevsistemas@gmail.com
                </a>
              </li>
              <li>
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/focodevsistemas/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  @focodevsistemas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container pb-10 text-sm text-gray-500">© {year} FocoDev Sistemas</div>
    </footer>
  )
}
