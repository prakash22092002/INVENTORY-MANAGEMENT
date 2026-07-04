import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

type BreadcrumbItem = {
  label: string
  href?: string
  icon?: React.ReactNode
}

type BreadcrumbsProps = {
  items?: BreadcrumbItem[]
  className?: string
}

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard className="breadcrumbs-icon-dashboard size-3" />,
}

const defaultLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  inventory: 'Inventory',
  orders: 'Orders',
  customers: 'Customers',
  suppliers: 'Suppliers',
  categories: 'Categories',
  reports: 'Reports',
  settings: 'Settings',
}

function segmentToLabel(segment: string): string {
  return defaultLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
}

function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const { pathname } = useLocation()

  const autoItems = useMemo(() => {
    if (items) return null
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) {
      return [{ label: 'Dashboard', href: '/', icon: iconMap.dashboard }]
    }
    const crumbs: BreadcrumbItem[] = []
    let accumulated = ''

    for (const segment of segments) {
      accumulated += `/${segment}`
      const label = segmentToLabel(segment)
      const icon = iconMap[segment]
      crumbs.push({
        label,
        href: accumulated,
        ...(icon ? { icon } : {}),
      })
    }
    return crumbs
  }, [pathname, items])

  const breadcrumbItems = items || autoItems!

  if (!breadcrumbItems || breadcrumbItems.length === 0) return null

  return (
    <nav
      className={cn('breadcrumbs-nav flex items-center gap-0.5 text-xs', className)}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1
        return (
          <span key={item.href || item.label} className="breadcrumbs-item-wrapper flex items-center gap-0.5">
            {index > 0 && (
              <ChevronRight className="breadcrumbs-separator size-2.5 shrink-0 text-zinc-300 dark:text-zinc-600" />
            )}
            {isLast ? (
              <span className="breadcrumbs-current flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href || '#'}
                className="breadcrumbs-link flex items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export { Breadcrumbs }
export type { BreadcrumbItem }
