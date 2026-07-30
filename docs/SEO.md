# SEO — estrutura do site

O site usa a API de Metadata do Next.js com URL canônica, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` e JSON-LD (Schema.org).

## Variável de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://www.focodev.com.br
```

Usada em canonical, sitemap, Open Graph e dados estruturados. Padrão: `https://www.focodev.com.br`.

## O que está implementado

| Recurso | Onde |
|---------|------|
| Metadata base + `metadataBase` | `src/app/layout.tsx` |
| Open Graph / Twitter | Todas as páginas públicas via `buildMetadata` |
| Canonical URLs | Por página |
| `sitemap.xml` | `src/app/sitemap.ts` (home, portfólio, landings, projetos) |
| `robots.txt` | `src/app/robots.ts` (bloqueia `/admin` e `/api`) |
| JSON-LD Organization + WebSite | Layout raiz |
| JSON-LD SoftwareApplication | `/fitlife`, `/rotas` |
| JSON-LD CreativeWork + Breadcrumb | Projetos e landings |
| `noindex` no admin | `src/app/admin/layout.tsx` |
| Helpers centralizados | `src/lib/seo.ts` |

## Páginas cobertas

- `/` — home
- `/projects` — portfólio
- `/projects/[slug]` — detalhe do projeto
- `/fitlife` — Foco Academia
- `/rotas` — App Rotas

## Depois do deploy

1. Confirme `https://www.focodev.com.br/robots.txt` e `/sitemap.xml`
2. No [Google Search Console](https://search.google.com/search-console), adicione a propriedade e envie o sitemap
3. Use a [Ferramenta de Teste de Resultados Rich](https://search.google.com/test/rich-results) para validar o JSON-LD
