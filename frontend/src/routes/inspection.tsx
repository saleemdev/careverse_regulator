import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import { z } from 'zod'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/stores/authStore'

const InspectionView = lazy(() => import('@/components/inspection'))

// Search param schema for type-safe URL params
const inspectionSearchSchema = z.object({
  search: z.string().optional(),
  status: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['facility_name', 'modified']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  activeTab: z.enum(['scheduled', 'findings']).default('scheduled'),
})

export type InspectionSearch = z.infer<typeof inspectionSearchSchema>

function InspectionComponent() {
  const navigate = Route.useNavigate()
  const user = useAuthStore((state) => state.user)

  const handleNavigate = (route: string) => {
    navigate({ to: `/${route}` as any })
  }

  const handleLogout = () => {
    window.location.href = '/logout?redirect-to=/'
  }

  const handleSwitchToDesk = () => {
    window.location.href = '/app'
  }

  return (
    <AppLayout
      currentRoute="inspection"
      pageTitle="Inspection Management"
      pageSubtitle="Schedule and view facility inspections."
      onNavigate={handleNavigate}
      onOpenNotifications={() => handleNavigate('notifications-center')}
      onLogout={handleLogout}
      onSwitchToDesk={handleSwitchToDesk}
      user={user}
    >
      <div className="hq-page-wrap">
        <InspectionView company={user?.company} />
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/inspection')({
  component: InspectionComponent,
  validateSearch: (search): InspectionSearch => inspectionSearchSchema.parse(search),
})
