import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/stores/authStore'

const RoadmapShell = lazy(() => import('@/components/RoadmapShell'))

function LicenseManagementComponent() {
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
      currentRoute="license-management"
      pageTitle="License Management"
      pageSubtitle="Process approvals, renewals, and enforcement outcomes."
      onNavigate={handleNavigate}
      onOpenNotifications={() => handleNavigate('notifications-center')}
      onLogout={handleLogout}
      onSwitchToDesk={handleSwitchToDesk}
      user={user}
    >
      <div className="hq-page-wrap">
        <RoadmapShell
          title="License Management"
          description="Coordinate application intake, renewals, and enforcement decisions."
        />
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/license-management')({
  component: LicenseManagementComponent,
})
