import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Menu,
    X,
    Bell,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderTree,
    BarChart3,
    Settings,
    LogOut,
    User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'

const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Inventory', href: '/inventory', icon: Package },
    { label: 'Orders', href: '/orders', icon: ShoppingCart },
    { label: 'Customers', href: '/customers', icon: Users },
    // { label: 'Suppliers', href: '/suppliers', icon: Building2 },
    { label: 'Categories', href: '/categories', icon: FolderTree },
    { label: 'Reports', href: '/reports', icon: BarChart3 },
    { label: 'Settings', href: '/settings', icon: Settings },
]

const notifications = [
    { id: 1, text: 'New order received', time: '2 min ago' },
    { id: 2, text: 'Low stock alert: Wireless Mouse', time: '15 min ago' },
    { id: 3, text: 'Payment confirmed for #ORD-003', time: '1 hr ago' },
]

function NotificationDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <>
            {open && <div className="navbar-notif-backdrop fixed inset-0 z-40" onClick={onClose} />}
            <div
                className={cn(
                    'navbar-notif-dropdown absolute right-0 top-full z-50 mt-2 w-80 origin-top-right overflow-hidden rounded-xl border border-zinc-200/60 bg-white/80 p-1 shadow-lg shadow-zinc-900/5 backdrop-blur-2xl transition-all duration-200 dark:border-zinc-700/50 dark:bg-zinc-900/80',
                    open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0',
                )}
            >
                <div className="navbar-notif-header flex items-center justify-between px-3 py-2">
                    <span className="navbar-notif-header-title text-sm font-medium">Notifications</span>
                    <span className="navbar-notif-header-count rounded-md bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {notifications.length}
                    </span>
                </div>
                <div className="navbar-notif-list max-h-64 space-y-0.5 overflow-y-auto">
                    {notifications.map((n) => (
                        <button
                            key={n.id}
                            className="navbar-notif-item flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50"
                        >
                            <span className="navbar-notif-item-text">{n.text}</span>
                            <span className="navbar-notif-item-time text-xs text-zinc-400">{n.time}</span>
                        </button>
                    ))}
                </div>
                <div className="navbar-notif-footer border-t border-zinc-100 pt-1 dark:border-zinc-800">
                    <button className="navbar-notif-footer-btn w-full rounded-lg px-3 py-2 text-center text-sm text-zinc-500 transition-colors hover:bg-zinc-100/70 hover:text-zinc-800 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200">
                        View all notifications
                    </button>
                </div>
            </div>
        </>
    )
}

function UserDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail")

    const profileLogo = userName?.split(' ').map((word) => word[0]).join('').toUpperCase()


    const signOutFn = (): void => {
        localStorage.clear();
        window.location.href = "/signup";
    }

    return (
        <>
            {open && <div className="navbar-user-backdrop fixed inset-0 z-40" onClick={onClose} />}
            <div
                className={cn(
                    'navbar-user-dropdown absolute right-0 top-full z-50 mt-2 min-w-56 w-max max-w-xs origin-top-right overflow-hidden rounded-xl border border-zinc-200/60 bg-white/80 p-1 shadow-lg shadow-zinc-900/5 backdrop-blur-2xl transition-all duration-200 dark:border-zinc-700/50 dark:bg-zinc-900/80',
                    open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0',
                )}
            >
                <div className="navbar-user-dropdown-header flex items-center gap-3 border-b border-zinc-100 px-3 py-2.5 dark:border-zinc-800">
                    <div className="navbar-user-dropdown-avatar flex size-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                        {profileLogo}
                    </div>
                    <div className="navbar-user-dropdown-info flex min-w-0 flex-col">
                        <span className="navbar-user-dropdown-name truncate text-sm font-medium">{userName}</span>
                        <span className="navbar-user-dropdown-email truncate text-xs text-zinc-400">{userEmail}</span>
                    </div>
                </div>
                <div className="navbar-user-dropdown-menu mt-1 space-y-0.5">
                    <button className="navbar-user-dropdown-item flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50">
                        <User className="navbar-user-dropdown-item-icon size-4 text-zinc-400" />
                        Profile
                    </button>
                    <button className="navbar-user-dropdown-item flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50">
                        <Settings className="navbar-user-dropdown-item-icon size-4 text-zinc-400" />
                        Settings
                    </button>
                    <div className="navbar-user-dropdown-divider my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    <button onClick={signOutFn} className="navbar-user-dropdown-item navbar-user-dropdown-item--signout flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100/70 hover:text-zinc-800 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200">
                        <LogOut className="navbar-user-dropdown-item-icon size-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail")

    const profileLogo = userName?.split(' ').map((word) => word[0]).join('').toUpperCase()

    return (
        <>
            {open && (
                <div
                    className="navbar-mobile-backdrop fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}
            <div
                className={cn(
                    'navbar-mobile-island fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col overflow-hidden rounded-r-3xl border border-zinc-200/50 bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-700/40 dark:bg-zinc-900/80',
                    open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none',
                )}
            >
                <div className="navbar-mobile-island-header flex items-center justify-between px-4 py-4">
                    <Link to="/" className="navbar-mobile-island-logo flex items-center gap-2.5">
                        <div className="navbar-mobile-island-logo-icon flex size-7 items-center justify-center rounded-lg bg-zinc-800 text-[10px] font-bold tracking-wider text-white dark:bg-zinc-200 dark:text-zinc-800">
                            MV
                        </div>
                        <span className="navbar-mobile-island-logo-text text-sm font-bold tracking-tight">MAMA VANJA</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="navbar-mobile-island-close flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X className="navbar-mobile-island-close-icon size-4" />
                    </button>
                </div>
                <nav className="navbar-mobile-island-nav flex-1 space-y-0.5 overflow-y-auto px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className="navbar-mobile-island-nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                            >
                                <Icon className="navbar-mobile-island-nav-item-icon size-4" />
                                <span className="navbar-mobile-island-nav-item-label">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="navbar-mobile-island-footer border-t border-zinc-100 px-2 py-3 dark:border-zinc-800">
                    <div className="navbar-mobile-island-user flex items-center gap-3 rounded-xl px-3 py-2">
                        <div className="navbar-mobile-island-user-avatar flex size-7 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                            {profileLogo}
                        </div>
                        <div className="navbar-mobile-island-user-info flex flex-col">
                            <span className="navbar-mobile-island-user-name text-sm font-medium">{userName}</span>
                            <span className="navbar-mobile-island-user-email text-xs text-zinc-400">{userEmail}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)

    useEffect(() => {
        const closeOnEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setNotifOpen(false)
                setUserOpen(false)
                setMobileOpen(false)
            }
        }
        document.addEventListener('keydown', closeOnEscape)
        return () => document.removeEventListener('keydown', closeOnEscape)
    }, [])

    const profileLogo = localStorage.getItem('userName')?.split(' ')?.map((word) => word[0]).join('').toUpperCase()

    return (
        <>
            <header
                className={cn(
                    'navbar sticky top-3 z-30 mx-auto flex h-12 items-center gap-3 rounded-2xl border border-zinc-200/50 bg-white/70 px-3 shadow-sm shadow-zinc-900/5 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-700/40 dark:bg-zinc-900/70',
                )}
            >
                <button
                    className="navbar-mobile-toggle -ml-1 flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100/70  dark:hover:bg-zinc-800/50"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu className="navbar-mobile-toggle-icon size-4.5" />
                </button>

                <Link to="/" className="navbar-logo-link flex items-center gap-2">
                    <div className="navbar-logo-icon flex size-6 items-center justify-center rounded-md bg-zinc-800 text-[9px] font-bold tracking-wider text-white dark:bg-zinc-200 dark:text-zinc-800">
                        MV
                    </div>
                </Link>

                <div className="navbar-breadcrumbs min-w-0 flex-1">
                    <Breadcrumbs />
                </div>

                <div className="navbar-actions flex items-center gap-0.5">
                    <div className="navbar-notifications relative">
                        <button
                            className="navbar-notif-btn relative flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50"
                            onClick={() => { setNotifOpen((p) => !p); setUserOpen(false) }}
                            aria-label="Notifications"
                        >
                            <Bell className="navbar-notif-btn-icon size-4 text-zinc-500" />
                            <span className="navbar-notif-dot absolute right-2 top-2 size-1 rounded-full bg-rose-400 ring-1 ring-white dark:ring-zinc-900" />
                        </button>
                        <NotificationDropdown open={notifOpen} onClose={() => setNotifOpen(false)} />
                    </div>

                    <div className="navbar-user relative">
                        <button
                            className="navbar-user-btn flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50"
                            onClick={() => { setUserOpen((p) => !p); setNotifOpen(false) }}
                            aria-label="User menu"
                        >
                            <div className="navbar-user-avatar flex size-6 items-center justify-center rounded-full bg-zinc-200 text-[9px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                                {profileLogo}
                            </div>
                        </button>
                        <UserDropdown open={userOpen} onClose={() => setUserOpen(false)} />
                    </div>
                </div>
            </header>

            <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    )
}

export { Navbar, navItems }
export type { BreadcrumbItem } from '@/components/common/Breadcrumbs'
