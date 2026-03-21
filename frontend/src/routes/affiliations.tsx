import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/stores/authStore'

const RoadmapShell = lazy(() => import('@/components/RoadmapShell'))

function AffiliationsComponent() {
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
      currentRoute="affiliations"
      pageTitle="Affiliation Operations"
      pageSubtitle="Review affiliation confirmations and escalations."
      onNavigate={handleNavigate}
      onOpenNotifications={() => handleNavigate('notifications-center')}
      onLogout={handleLogout}
      onSwitchToDesk={handleSwitchToDesk}
      user={user}
    >
      <div className="hq-page-wrap">
        <RoadmapShell
          title="Affiliation Operations"
          description="Review pending professional affiliations, confirmations, and exception handling."
        />
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/affiliations')({
  component: AffiliationsComponent,
})
