# SEO — estrutura do site

O site usa a API de Metadata do Next.js com URL canônica, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` e JSON-LD (Schema.org).

## Variáveis de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://www.focodev.com.br
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## Diagnóstico de posicionamento (jul/2026)

| Consulta | Situação |
|----------|----------|
| `FocoDev Sistemas` / `focodev.com.br` | Site aparece — marca está indexada |
| `desenvolvimento de software sob medida` (genérico) | Concorrentes maiores dominam; site ainda pouco competitivo |
| `software Ribeirão Preto` / local | Concorrentes locais com páginas longas e FAQ; FocoDev ainda sem relevância local forte |

**Produção atual (antes deste deploy):** `/sitemap.xml` e `/robots.txt` do Next ainda não existiam (404). O Cloudflare serve um `robots.txt` gerenciado. Após o merge/deploy deste PR, o sitemap próprio passa a existir.

## O que está implementado

| Recurso | Onde |
|---------|------|
| Metadata base + `metadataBase` | `src/app/layout.tsx` |
| Open Graph / Twitter (PNG) | Páginas públicas via `buildMetadata` |
| Canonical URLs | Por página |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` (bloqueia `/admin` e `/api`) |
| JSON-LD Organization / ProfessionalService + WebSite | Layout |
| JSON-LD Service (ItemList) + FAQPage | Home |
| JSON-LD SoftwareApplication | `/fitlife`, `/rotas` |
| Copy “Sobre” + FAQ on-page | Home |
| `noindex` no admin | `src/app/admin/layout.tsx` |
| Helpers | `src/lib/seo.ts` |

## Próximos passos (fora do código)

1. Fazer deploy e confirmar `https://www.focodev.com.br/sitemap.xml`
2. Cadastrar a propriedade no [Google Search Console](https://search.google.com/search-console) e enviar o sitemap
3. Colar o código de verificação em `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
4. Criar backlinks (Instagram bio, Google Business Profile, parceiros)
5. Trocar depoimentos ilustrativos por cases reais quando possível (sem Review schema falso)
6. Conteúdo contínuo (blog/cases) para palavras-chave de cauda longa

## Validação

- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
