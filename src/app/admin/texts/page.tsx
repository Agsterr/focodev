"use client"
import CrudManager from '@/components/admin/crud-manager'
import { PageHeader } from '@/components/admin/form'

export default function AdminTextsPage() {
  return (
    <div>
      <PageHeader title="Textos institucionais" description="Textos identificados por uma chave (ex: sobre, missao)." />
      <CrudManager
        endpoint="/api/texts"
        entityName="Texto"
        titleKey="key"
        fields={[
          { name: 'key', label: 'Chave', required: true, minLength: 2, placeholder: 'sobre' },
          { name: 'content', label: 'Conteúdo', type: 'textarea', required: true },
        ]}
        columns={[
          { key: 'key', label: 'Chave' },
          { key: 'content', label: 'Conteúdo', muted: true },
        ]}
      />
    </div>
  )
}
