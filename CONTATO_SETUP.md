# Avisos do formulário de contato

Quando alguém envia o formulário do site, a mensagem:

1. é salva no banco (painel → **Mensagens**);
2. gera um **e-mail** para `agster.santos01@gmail.com` (e para quem estiver em `CONTACT_RECEIVER_EMAIL`), com "responder para" o e-mail do cliente;
3. gera uma **mensagem no WhatsApp** do número `ADMIN_WHATSAPP_NUMBER`.

E-mail e WhatsApp são enviados ao mesmo tempo. Se um deles falhar, o formulário continua funcionando e a falha fica registrada nos logs.

No painel, em **Mensagens**, o quadro "Avisos de novo contato" mostra o que está configurado e tem o botão **Enviar teste**.

As variáveis abaixo vão no `.env` do servidor (`/opt/focodev-site/.env`). Depois de editar, reinicie o app:

```bash
cd /opt/focodev-site && docker compose up -d app
```

## E-mail via Gmail (recomendado)

1. Ative a verificação em duas etapas na conta Google.
2. Crie uma **senha de app** em https://myaccount.google.com/apppasswords.
3. Configure:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=agster.santos01@gmail.com
SMTP_PASSWORD=senha-de-app-de-16-letras
```

Alternativa: Resend (`RESEND_API_KEY` e `RESEND_FROM_EMAIL`). Se os dois estiverem configurados, o site tenta o Resend primeiro e usa o Gmail se ele falhar.

## WhatsApp via CallMeBot (grátis, para o seu próprio número)

1. Salve o contato **+34 694 25 79 62** no celular.
2. Mande para ele pelo WhatsApp: `I allow callmebot to send me messages`.
3. Você recebe a API key em resposta. Configure:

```env
ADMIN_WHATSAPP_NUMBER=5516991183292
WHATSAPP_CALLMEBOT_APIKEY=123456
```

Instruções oficiais: https://www.callmebot.com/blog/free-api-whatsapp-messages/

## WhatsApp via webhook (n8n, Evolution API, Z-API…)

Se preferir usar seu n8n ou outra API, defina `WHATSAPP_WEBHOOK_URL`. O site faz um `POST` JSON:

```json
{
  "to": "5516991183292",
  "text": "🔔 *Novo contato no site* ...",
  "contact": { "name": "...", "email": "...", "phone": "...", "message": "...", "date": "2026-10-15T16:00:00.000Z" }
}
```

`WHATSAPP_WEBHOOK_TOKEN` (opcional) é enviado como `Authorization: Bearer <token>`. Webhook e CallMeBot podem ser usados juntos.
