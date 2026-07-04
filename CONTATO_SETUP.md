# 📧 Sistema de Contato - Guia de Configuração

Este documento explica como configurar o sistema completo de contato que foi implementado.

## ✅ Funcionalidades Implementadas

1. ✅ Formulário de contato com validação e feedback visual
2. ✅ Salvamento no banco de dados (tabela `ContactMessage`)
3. ✅ Envio de e-mail automático
4. ✅ Notificação via WhatsApp
5. ✅ Painel admin para visualizar mensagens
6. ✅ Contador de mensagens novas no dashboard
7. ✅ Notificações visuais no layout admin

## 🗄️ Banco de Dados

### Migration Necessária

Execute a migration para criar a tabela `ContactMessage`:

```bash
npx prisma migrate dev --name add_contact_messages
```

Ou em produção:

```bash
npx prisma migrate deploy
```

### Schema

A tabela `ContactMessage` foi criada com os seguintes campos:
- `id`: ID único
- `name`: Nome do contato
- `email`: E-mail do contato
- `phone`: Telefone (opcional)
- `message`: Mensagem
- `status`: Status (NOVO ou RESPONDIDO)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## 📧 Configuração de E-mail

### Opção 1: Resend (Recomendado)

1. Crie uma conta em [Resend](https://resend.com)
2. Obtenha sua API Key
3. Adicione no `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@seudominio.com
```

### Opção 2: SMTP

Para usar SMTP, você precisará instalar o `nodemailer`:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

E configurar no `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
```

**Nota:** O código atual suporta Resend por padrão. Para SMTP, será necessário implementar a função `sendEmailViaSMTP` em `src/lib/email.ts`.

## 📱 Configuração de WhatsApp

### Opção 1: Link Direto (Atual)

O sistema atual gera um link do WhatsApp Web. Configure no `.env.local`:

```env
ADMIN_WHATSAPP_NUMBER=5516991183292
# ou
NEXT_PUBLIC_WHATSAPP_NUMBER=5516991183292
```

**Formato:** Número com código do país, sem caracteres especiais (ex: 5516991183292)

### Opção 2: API de WhatsApp (Futuro)

Para notificações automáticas via API, você pode usar:
- Twilio WhatsApp API
- WhatsApp Business API
- Outros serviços

O código está preparado para isso em `src/lib/whatsapp.ts` (função comentada).

## 🔧 Variáveis de Ambiente

Adicione no seu `.env.local`:

```env
# E-mail (escolha uma opção)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@seudominio.com

# OU SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=seu-email@gmail.com
# SMTP_PASSWORD=sua-senha-app

# WhatsApp
ADMIN_WHATSAPP_NUMBER=5516991183292

# Database (já deve estar configurado)
DATABASE_URL=postgresql://...

# NextAuth (já deve estar configurado)
NEXTAUTH_SECRET=seu-secret
```

## 🚀 Como Usar

### 1. Executar Migration

```bash
npx prisma migrate dev
npx prisma generate
```

### 2. Configurar Variáveis de Ambiente

Crie/atualize o arquivo `.env.local` com as configurações acima.

### 3. Testar o Formulário

1. Acesse o site público
2. Vá até a seção de contato
3. Preencha e envie o formulário
4. Verifique:
   - ✅ Mensagem salva no banco
   - ✅ E-mail recebido (se configurado)
   - ✅ Notificação WhatsApp (se configurado)
   - ✅ Mensagem aparece no painel admin

### 4. Acessar Painel Admin

1. Acesse `/admin/contacts`
2. Visualize todas as mensagens
3. Clique em uma mensagem para ver detalhes
4. Marque como "Respondido" quando necessário

## 📊 Funcionalidades do Painel Admin

### Dashboard (`/admin`)
- Card "Mensagens" com contador total
- Badge vermelho com número de mensagens novas
- Link direto para `/admin/contacts`

### Página de Mensagens (`/admin/contacts`)
- Lista todas as mensagens
- Filtros: Todas, Novas, Respondidas
- Visualização de detalhes ao clicar
- Marcar como respondido/novo
- Paginação
- Links para e-mail e telefone

### Notificações Visuais
- Badge no header do admin quando há mensagens novas
- Badge na sidebar no item "Mensagens"
- Atualização automática a cada 30 segundos

## 🐛 Tratamento de Erros

O sistema foi projetado para ser resiliente:

- ✅ Se o e-mail falhar, ainda salva no banco e tenta WhatsApp
- ✅ Se o WhatsApp falhar, ainda salva no banco e tenta e-mail
- ✅ Erros são logados na tabela `Logs` para debug
- ✅ O formulário sempre retorna feedback ao usuário

## 📝 Logs

Todos os eventos são registrados na tabela `Logs`:
- `contact_message_created`: Nova mensagem criada
- `contact_email_failed`: Falha ao enviar e-mail
- `contact_whatsapp_failed`: Falha ao enviar WhatsApp
- `contact_status_updated`: Status atualizado

## 🔒 Segurança

- ✅ Validação de campos obrigatórios
- ✅ Sanitização de dados (XSS protection)
- ✅ Validação de formato de e-mail
- ✅ Proteção básica contra spam (tamanho mínimo/máximo)
- ✅ Autenticação requerida para acessar `/admin/contacts`

## 🎨 Personalização

### E-mail

Edite o template em `src/lib/email.ts` na função `formatContactEmail()`.

### WhatsApp

Edite o formato da mensagem em `src/lib/whatsapp.ts` na função `formatWhatsAppMessage()`.

### Formulário

O componente está em `src/components/ContactForm.tsx` e pode ser personalizado.

## 📚 Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # API de envio do formulário
│   │   └── contacts/route.ts     # API de listagem/atualização
│   └── admin/
│       └── contacts/
│           └── page.tsx          # Página de mensagens no admin
├── components/
│   ├── ContactForm.tsx           # Formulário de contato
│   └── ContactsNotification.tsx   # Notificação no header
└── lib/
    ├── email.ts                  # Serviço de e-mail
    └── whatsapp.ts               # Serviço de WhatsApp
```

## ⚠️ Importante

1. **E-mail não configurado**: O sistema continuará funcionando, mas apenas salvará no banco
2. **WhatsApp não configurado**: O sistema continuará funcionando, mas não enviará notificação
3. **Migration obrigatória**: Execute a migration antes de usar o sistema
4. **Variáveis de ambiente**: Configure pelo menos uma forma de notificação (e-mail ou WhatsApp)

## 🆘 Troubleshooting

### E-mail não está sendo enviado
- Verifique se `RESEND_API_KEY` está configurado
- Verifique se `RESEND_FROM_EMAIL` está configurado
- Verifique os logs no console do servidor
- Verifique a tabela `Logs` no banco de dados

### WhatsApp não está funcionando
- Verifique se `ADMIN_WHATSAPP_NUMBER` está configurado
- O número deve estar no formato internacional (ex: 5516991183292)
- Em desenvolvimento, o link é apenas logado no console

### Mensagens não aparecem no admin
- Verifique se a migration foi executada
- Verifique se está logado como admin
- Verifique os logs do servidor

## 📞 Suporte

Se tiver problemas, verifique:
1. Console do servidor (logs)
2. Tabela `Logs` no banco de dados
3. Network tab do navegador (erros de API)




