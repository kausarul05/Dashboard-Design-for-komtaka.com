import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import BasicTableOne from '@/components/tables/BasicTableOne'
import React from 'react'

export default function page() {
    return (
        <div>
            {/* <PageBreadcrumb pageTitle="" /> */}
            <div className="space-y-6">
                <ComponentCard title="Order Details">
                    <BasicTableOne />
                </ComponentCard>
            </div>
        </div>
    )
}
