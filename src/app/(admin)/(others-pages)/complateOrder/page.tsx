import ComponentCard from '@/components/common/ComponentCard'
import ComplateOrderTables from '@/components/tables/ComplateOrderTables'
import React from 'react'

export default function page() {
  return (
    <div>
      {/* <PageBreadcrumb pageTitle="" /> */}
      <div className="space-y-6">
        <ComponentCard title="Complate Orders">
          <ComplateOrderTables />
        </ComponentCard>
      </div>
    </div>
  )
}
