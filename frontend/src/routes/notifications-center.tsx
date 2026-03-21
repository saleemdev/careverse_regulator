import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/stores/authStore'

const RoadmapShell = lazy(() => import('@/components/RoadmapShell'))

function NotificationsCenterComponent() {
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
      currentRoute="notifications-center"
      pageTitle="Notifications Center"
      pageSubtitle="Track reminders, alerts, and follow-up actions."
      onNavigate={handleNavigate}
      onOpenNotifications={() => handleNavigate('notifications-center')}
      onLogout={handleLogout}
      onSwitchToDesk={handleSwitchToDesk}
      user={user}
    >
      <div className="hq-page-wrap">
        <RoadmapShell
          title="Notifications Center"
          description="Review platform alerts, reminders, and operational follow-up items."
        />
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/notifications-center')({
  component: NotificationsCenterComponent,
})
