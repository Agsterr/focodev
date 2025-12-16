# 📧 Configuração do Resend no Vercel

## ✅ Variáveis Necessárias no Vercel

Configure estas variáveis de ambiente no painel do Vercel:

### 1. Variáveis Obrigatórias

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@seudominio.com
```

### 2. Variável Opcional (Destinatário)

```env
CONTACT_RECEIVER_EMAIL=seu-email@exemplo.com
```

**Nota:** Se não configurar `CONTACT_RECEIVER_EMAIL`, o e-mail será enviado para `focodevsistemas@gmail.com` (padrão).

## 🔧 Como Configurar no Vercel

1. Acesse seu projeto no [Vercel](https://vercel.com)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as variáveis:
   - `RESEND_API_KEY` - Sua API Key do Resend
   - `RESEND_FROM_EMAIL` - E-mail remetente verificado no Resend
   - `CONTACT_RECEIVER_EMAIL` (opcional) - E-mail que receberá as mensagens

## ⚠️ Importante

### RESEND_FROM_EMAIL

- **DEVE** ser um e-mail verificado no Resend
- Se você não verificou um domínio, use o domínio do Resend: `onboarding@resend.dev`
- Para usar seu próprio domínio, você precisa:
  1. Verificar o domínio no Resend
  2. Configurar os registros DNS
  3. Aguardar a verificação

### RESEND_API_KEY

- Obtenha em: https://resend.com/api-keys
- Formato: `re_xxxxxxxxxxxxx`
- Mantenha segura, não compartilhe

## 🧪 Como Testar

1. Configure as variáveis no Vercel
2. Faça um novo deploy (ou aguarde o redeploy automático)
3. Envie um formulário de teste
4. Verifique os logs no Vercel:
   - Vá em **Deployments** → Seu deployment → **Functions** → `/api/contact`
   - Procure por logs como `[Email] Enviando via Resend` ou erros

## 🐛 Troubleshooting

### E-mail não está sendo enviado

1. **Verifique os logs no Vercel:**
   - Procure por `[Email]` nos logs
   - Verifique se há erros da API Resend

2. **Verifique se as variáveis estão configuradas:**
   - No Vercel, vá em Settings → Environment Variables
   - Confirme que `RESEND_API_KEY` e `RESEND_FROM_EMAIL` estão presentes
   - **IMPORTANTE:** Verifique se estão configuradas para o ambiente correto (Production, Preview, Development)

3. **Verifique o e-mail remetente:**
   - O `RESEND_FROM_EMAIL` deve ser um e-mail verificado no Resend
   - Se não verificou um domínio, use `onboarding@resend.dev` temporariamente

4. **Verifique a API Key:**
   - Confirme que a API Key está correta
   - Verifique se não expirou ou foi revogada

5. **Erros comuns:**
   - `Invalid API key`: API Key incorreta ou inválida
   - `Domain not verified`: Domínio do e-mail remetente não verificado
   - `Forbidden`: API Key sem permissões adequadas

## 📝 Exemplo de Configuração Completa

No Vercel, configure:

```
RESEND_API_KEY=re_abc123xyz789
RESEND_FROM_EMAIL=contato@seudominio.com
CONTACT_RECEIVER_EMAIL=seu-email-pessoal@gmail.com
```

**Nota:** Se `contato@seudominio.com` não estiver verificado, use `onboarding@resend.dev` temporariamente.

## 🔄 Após Configurar

1. **Faça um novo deploy** (ou aguarde o redeploy automático)
2. **Teste o formulário** novamente
3. **Verifique os logs** para confirmar que está funcionando

## 📞 Suporte

Se ainda não funcionar:
1. Verifique os logs detalhados no Vercel
2. Verifique o dashboard do Resend para ver se há erros
3. Confirme que o e-mail remetente está verificado no Resend


