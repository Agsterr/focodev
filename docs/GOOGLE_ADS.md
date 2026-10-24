# Google Ads e GA4 — rastreamento de cliques e conversões

O site carrega o Google tag (gtag.js) quando `GOOGLE_ADS_ID` e/ou `GA_MEASUREMENT_ID` estão no `.env` do servidor.
Os valores são lidos **em tempo de execução**: em produção basta editar `/opt/focodev-site/.env` e rodar
`docker compose up -d app` (não precisa rebuild). `NEXT_PUBLIC_*` continua aceito só para desenvolvimento local.

## Variáveis de ambiente

```env
GOOGLE_ADS_ID=AW-XXXXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Opcionais — labels das ações de conversão criadas no Google Ads
# Aceita "AW-XXXXXXXXX/label" ou só "label"
GOOGLE_ADS_CONVERSION_CONTACT=
GOOGLE_ADS_CONVERSION_WHATSAPP=
GOOGLE_ADS_CONVERSION_PHONE=
GOOGLE_ADS_CONVERSION_FORM_START=
GOOGLE_ADS_CONVERSION_CTA=
```

1. **GA4**: [analytics.google.com](https://analytics.google.com) → Administrador → Criar propriedade → Fluxo de dados da Web
   (`https://www.focodev.com.br`) → copie o **ID de medição** `G-...`. Deixe a "Medição otimizada" ligada (rolagem, saídas, buscas).
2. **Google Ads**: Metas → Conversões → Nova ação de conversão → Site → copie o ID `AW-...` e o **label** de cada ação.
3. Vincule o GA4 ao Google Ads (GA4 → Administrador → Vinculações de produtos → Google Ads) e importe os eventos
   `generate_lead` e `whatsapp_click` como conversões — assim não precisa nem dos labels.

## Eventos enviados

| Evento | Quando dispara | Parâmetros |
|--------|----------------|------------|
| `site_click` | **Qualquer** clique em link ou botão do site público | `click_text`, `click_url`, `click_section` (seção da página), `link_type`, `page_path` |
| `form_start` | Primeiro foco em um campo do formulário | `source` |
| `generate_lead` | Envio **bem-sucedido** do formulário (conversão principal) | `source`, `method` |
| `whatsapp_click` | Clique em qualquer link de WhatsApp | `source` |
| `phone_click` | Clique em link `tel:` | `source` |
| `cta_click` | CTAs de orçamento (navbar, hero, landings) | `source`, `destination` |
| `mailto_click` | Clique em e-mail | `source` |

O painel `/admin` não é rastreado. Para mudar o nome que aparece num clique, use `data-track="nome"` no elemento;
para não rastrear, `data-no-track`.

Para ver os cliques no GA4: Relatórios → Engajamento → Eventos → `site_click`. Registre `click_text`, `click_section`
e `link_type` como **dimensões personalizadas** (Administrador → Definições personalizadas) para quebrar por botão e seção.

## Origem de cada orçamento

Na primeira visita o navegador guarda UTM (`utm_source`, `utm_campaign`, ...), `gclid`, página de entrada e site de origem.
Quando a pessoa envia o formulário, isso vai junto e fica salvo em `ContactMessage.attribution`. Aparece:

- no painel **Admin → Contatos** (campo "Origem");
- no e-mail e no WhatsApp de aviso de novo contato.

Nas campanhas, deixe a **marcação automática** (auto-tagging) ligada no Google Ads e use URLs finais com UTM, ex.:
`https://www.focodev.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=sistemas-franca`

## Como testar

1. Defina os IDs e reinicie o app.
2. Abra o site com o **Google Tag Assistant** (tagassistant.google.com) ou DevTools → Network filtrando `collect`.
3. Clique em botões, no WhatsApp e envie o formulário; confira `site_click`, `whatsapp_click`, `generate_lead`.
4. No GA4, Relatórios → Tempo real mostra os eventos em segundos.
