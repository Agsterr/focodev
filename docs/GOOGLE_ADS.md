# Google Ads — rastreamento de conversões

O site dispara eventos do Google Ads (gtag) nos pontos de conversão. Sem `NEXT_PUBLIC_GOOGLE_ADS_ID`, o tag não carrega.

## Variáveis de ambiente

No `.env` / painel de deploy (Vercel, etc.):

```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Opcionais — labels das ações de conversão criadas no Google Ads
# Aceita "AW-XXXXXXXXX/label" ou só "label"
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FORM_START=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CTA=
```

1. No Google Ads: **Ferramentas → Medição → Conversões → Nova ação → Site**.
2. Escolha **Usar o código do Google Tag** e copie o ID `AW-...`.
3. Para cada ação, copie o **label** (ou o `send_to` completo `AW-.../label`) e cole nas variáveis acima.

Mesmo sem labels, os eventos customizados já são enviados e podem ser importados no Ads como conversões a partir de eventos.

## Eventos rastreados

| Evento | Quando dispara | Onde |
|--------|----------------|------|
| `form_start` | Primeiro foco em qualquer campo do formulário | Home, /fitlife, /rotas |
| `generate_lead` | Envio **bem-sucedido** do formulário | Mesmos formulários |
| `whatsapp_click` | Clique em link WhatsApp | Botão flutuante, footer, landings |
| `cta_click` | Clique em CTAs de orçamento / contato | Navbar "Orçar Projeto", hero das landings |
| `mailto_click` | Clique no e-mail do rodapé | Footer |

## Como testar

1. Defina `NEXT_PUBLIC_GOOGLE_ADS_ID` e reinicie o app.
2. Abra o site com a extensão **Google Tag Assistant** (ou DevTools → Network filtrando `google`).
3. Preencha o formulário / clique no WhatsApp e confirme os eventos `form_start`, `generate_lead`, `whatsapp_click`, etc.
