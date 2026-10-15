"use client"
import CrudManager from '@/components/admin/crud-manager'
import { PageHeader } from '@/components/admin/form'

export default function AdminServicesPage() {
  return (
    <div>
      <PageHeader title="Serviços" description="Serviços exibidos na home (os 6 mais recentes)." />
      <CrudManager
        endpoint="/api/services"
        entityName="Serviço"
        titleKey="title"
        fields={[
          { name: 'title', label: 'Título', required: true, minLength: 3 },
          { name: 'description', label: 'Descrição', type: 'textarea', required: true, minLength: 10 },
        ]}
        columns={[
          { key: 'title', label: 'Título' },
          { key: 'description', label: 'Descrição', muted: true },
        ]}
      />
    </div>
  )
}
