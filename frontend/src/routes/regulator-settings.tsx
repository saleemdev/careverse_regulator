import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/stores/authStore'

const RoadmapShell = lazy(() => import('@/components/RoadmapShell'))

function RegulatorSettingsComponent() {
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
      currentRoute="regulator-settings"
      pageTitle="Regulator Settings"
      pageSubtitle="Configure governance defaults and threshold rules."
      onNavigate={handleNavigate}
      onOpenNotifications={() => handleNavigate('notifications-center')}
      onLogout={handleLogout}
      onSwitchToDesk={handleSwitchToDesk}
      user={user}
    >
      <div className="hq-page-wrap">
        <RoadmapShell
          title="Regulator Settings"
          description="Configure governance defaults and compliance policy thresholds."
        />
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/regulator-settings')({
  component: RegulatorSettingsComponent,
})
