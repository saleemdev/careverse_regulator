import { useEffect, useMemo } from 'react'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { ConfigProvider, theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'
import { ProConfigProvider } from '@ant-design/pro-components'
import enUS from 'antd/locale/en_US'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'

function createThemeConfig(mode: 'light' | 'dark'): ThemeConfig {
  const isDark = mode === 'dark'

  return {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#0f766e',
      colorInfo: '#0f766e',
      colorSuccess: '#0f766e',
      colorWarning: '#d97706',
      colorError: '#dc2626',
      colorBgLayout: isDark ? '#08111f' : '#f4f7fb',
      colorBgContainer: isDark ? '#0f1a2a' : '#ffffff',
      colorText: isDark ? '#e2e8f0' : '#111827',
      colorTextSecondary: isDark ? '#94a3b8' : '#64748b',
      colorBorder: isDark ? '#334155' : '#d8e1eb',
      borderRadius: 12,
      boxShadow: 'none',
      boxShadowSecondary: 'none',
      fontFamily: '"Public Sans", "Manrope", "Plus Jakarta Sans", "Nunito Sans", sans-serif',
      fontWeightStrong: 600,
    },
  }
}

function RootComponent() {
  const mode = useThemeStore((state) => state.mode)
  const themeConfig = useMemo(() => createThemeConfig(mode), [mode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  return (
    <ConfigProvider theme={themeConfig} locale={enUS}>
      <ProConfigProvider hashed={false}>
        <Outlet />
      </ProConfigProvider>
    </ConfigProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    const authState = useAuthStore.getState()

    // If guest, redirect to unauthorized page
    if (authState.status === 'guest') {
      throw redirect({
        to: '/unauthorized',
        search: { mode: 'guest' },
      })
    }

    // If authenticated but no portal access, determine mode and redirect
    if (authState.status === 'authenticated' && !authState.hasPortalAccess) {
      const isCompanyMisconfigured =
        authState.accessIssue === 'missing_company_permission' ||
        authState.accessIssue === 'multiple_company_permissions'

      throw redirect({
        to: '/unauthorized',
        search: {
          mode: isCompanyMisconfigured ? 'tenant-misconfigured' : 'forbidden'
        },
      })
    }
  },
})
