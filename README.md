# FocoDev Site

Site institucional da FocoDev Sistemas com painel administrativo.

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Neon (https://neon.tech) ou outro banco PostgreSQL

### Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd focodev-site
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Edite o `.env.local` e configure:
   - `DATABASE_URL`: String de conexão do seu banco PostgreSQL (Neon)
   - `NEXTAUTH_SECRET`: Gere com `openssl rand -base64 32`
   - `CLOUDINARY_*`: Credenciais do Cloudinary (opcional, para uploads)
   - Outras variáveis conforme necessário

5. Configure o banco de dados
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

6. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

- `src/app/` - Páginas e rotas Next.js
- `src/app/admin/` - Painel administrativo
- `src/app/api/` - Rotas da API
- `src/components/` - Componentes React
- `src/lib/` - Utilitários e configurações
- `prisma/` - Schema e migrations do Prisma

## 🎨 Recursos

- ✅ Design moderno e responsivo
- ✅ Dark mode
- ✅ Painel administrativo completo
- ✅ Gerenciamento de serviços, projetos, vídeos e imagens
- ✅ Integração com Cloudinary para uploads
- ✅ Autenticação com NextAuth
- ✅ Formulário de contato

## 🔧 Tecnologias

- Next.js 14
- TypeScript
- Prisma + Neon (PostgreSQL)
- Tailwind CSS
- NextAuth
- Cloudinary

