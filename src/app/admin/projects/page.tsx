"use client"
import CrudManager from '@/components/admin/crud-manager'
import { PageHeader } from '@/components/admin/form'

export default function AdminProjectsPage() {
  return (
    <div>
      <PageHeader title="Projetos" description="Portfólio exibido na home e em /projects. As imagens são vinculadas na Galeria." />
      <CrudManager
        endpoint="/api/projects"
        entityName="Projeto"
        titleKey="title"
        fields={[
          { name: 'title', label: 'Título', required: true, minLength: 3 },
          {
            name: 'slug',
            label: 'Slug (endereço)',
            required: true,
            minLength: 3,
            placeholder: 'meu-projeto',
            help: 'Só letras minúsculas, números e hífen. Vira o link /projects/slug.',
          },
          { name: 'description', label: 'Descrição', type: 'textarea', required: true, minLength: 20 },
          { name: 'coverImageUrl', label: 'Imagem de capa (URL)', type: 'url', help: 'Opcional. Envie a imagem na Galeria e cole o link aqui.' },
        ]}
        columns={[
          { key: 'title', label: 'Título' },
          { key: 'slug', label: 'Slug', muted: true },
        ]}
      />
    </div>
  )
}
