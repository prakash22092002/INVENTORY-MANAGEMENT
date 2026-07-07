import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Phone, Shield, Palette, Globe, Clock, Bell, Camera, Save } from 'lucide-react'

const Settings = () => {
    return (
        <div className="settings flex flex-col gap-6">
            <div className="settings-header flex flex-col gap-1">
                <h1 className="settings-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Settings
                </h1>
                <p className="settings-header-subtitle text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Card className="settings-profile-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="settings-profile-card-header">
                    <CardTitle className="settings-profile-card-title flex items-center gap-2 text-sm font-semibold">
                        <User className="settings-profile-card-title-icon size-4" />
                        Profile Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="settings-profile-card-body">
                    <div className="settings-profile-avatar-section flex items-center gap-5 pb-6 border-b border-zinc-200/50 dark:border-zinc-700/40">
                        <div className="settings-profile-avatar-wrapper relative">
                            <div className="settings-profile-avatar flex size-20 items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                                PP
                            </div>
                            <button className="settings-profile-avatar-upload-btn absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-zinc-800 text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
                                <Camera className="settings-profile-avatar-upload-icon size-3.5" />
                            </button>
                        </div>
                        <div className="settings-profile-avatar-info flex flex-col gap-0.5">
                            <span className="settings-profile-avatar-name text-sm font-medium">Prakash Paudel</span>
                            <span className="settings-profile-avatar-role text-xs text-muted-foreground">Administrator</span>
                        </div>
                    </div>

                    <div className="settings-profile-fields-grid grid grid-cols-1 gap-x-6 gap-y-5 pt-6 sm:grid-cols-2">
                        <div className="settings-field settings-field--name">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <User className="settings-field-label-icon size-3" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Prakash Paudel"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>

                        <div className="settings-field settings-field--email">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Mail className="settings-field-label-icon size-3" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                defaultValue="prakash@example.com"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>

                        <div className="settings-field settings-field--phone">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Phone className="settings-field-label-icon size-3" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                defaultValue="+1 (555) 123-4567"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>

                        <div className="settings-field settings-field--role">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Shield className="settings-field-label-icon size-3" />
                                Role
                            </label>
                            <div className="settings-field-role-wrapper relative">
                                <select
                                    defaultValue="admin"
                                    className="settings-field-select w-full appearance-none rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 pr-9 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:border-zinc-500"
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="manager">Manager</option>
                                    <option value="staff">Staff</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                                <div className="settings-field-role-chevron pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="settings-preferences-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="settings-preferences-card-header">
                    <CardTitle className="settings-preferences-card-title flex items-center gap-2 text-sm font-semibold">
                        <Palette className="settings-preferences-card-title-icon size-4" />
                        Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent className="settings-preferences-card-body">
                    <div className="settings-preferences-grid grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <div className="settings-field settings-field--theme">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Palette className="settings-field-label-icon size-3" />
                                Theme
                            </label>
                            <div className="settings-theme-toggle flex gap-2">
                                {['Light', 'Dark', 'System'].map((mode) => (
                                    <label
                                        key={mode}
                                        className={`settings-theme-option settings-theme-option--${mode.toLowerCase()} flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                                            mode === 'System'
                                                ? 'border-zinc-800 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-800'
                                                : 'border-zinc-200/70 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="theme"
                                            defaultChecked={mode === 'System'}
                                            className="settings-theme-option-input sr-only"
                                        />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="settings-field settings-field--language">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Globe className="settings-field-label-icon size-3" />
                                Language
                            </label>
                            <div className="settings-field-language-wrapper relative">
                                <select
                                    defaultValue="en"
                                    className="settings-field-select w-full appearance-none rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 pr-9 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:border-zinc-500"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="ja">Japanese</option>
                                </select>
                                <div className="settings-field-language-chevron pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="settings-field settings-field--timezone">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Clock className="settings-field-label-icon size-3" />
                                Timezone
                            </label>
                            <div className="settings-field-timezone-wrapper relative">
                                <select
                                    defaultValue="america-new_york"
                                    className="settings-field-select w-full appearance-none rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 pr-9 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:border-zinc-500"
                                >
                                    <option value="america-new_york">America/New York (EST)</option>
                                    <option value="america-chicago">America/Chicago (CST)</option>
                                    <option value="america-denver">America/Denver (MST)</option>
                                    <option value="america-los_angeles">America/Los Angeles (PST)</option>
                                    <option value="europe-london">Europe/London (GMT)</option>
                                    <option value="asia-tokyo">Asia/Tokyo (JST)</option>
                                    <option value="asia-kathmandu">Asia/Kathmandu (NPT)</option>
                                </select>
                                <div className="settings-field-timezone-chevron pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="settings-field settings-field--currency">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <Palette className="settings-field-label-icon size-3" />
                                Currency
                            </label>
                            <div className="settings-field-currency-wrapper relative">
                                <select
                                    defaultValue="usd"
                                    className="settings-field-select w-full appearance-none rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 pr-9 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:border-zinc-500"
                                >
                                    <option value="usd">USD ($)</option>
                                    <option value="eur">EUR (€)</option>
                                    <option value="gbp">GBP (£)</option>
                                    <option value="jpy">JPY (¥)</option>
                                    <option value="npr">NPR (Rs.)</option>
                                </select>
                                <div className="settings-field-currency-chevron pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="settings-notifications-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="settings-notifications-card-header">
                    <CardTitle className="settings-notifications-card-title flex items-center gap-2 text-sm font-semibold">
                        <Bell className="settings-notifications-card-title-icon size-4" />
                        Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="settings-notifications-card-body">
                    <div className="settings-notifications-list flex flex-col gap-3">
                        {[
                            { id: 'order-updates', label: 'Order Updates', desc: 'Receive notifications when order status changes.' },
                            { id: 'low-stock', label: 'Low Stock Alerts', desc: 'Get alerted when product stock falls below threshold.' },
                            { id: 'new-orders', label: 'New Orders', desc: 'Notify me when a new order is placed.' },
                            { id: 'weekly-report', label: 'Weekly Reports', desc: 'Send a weekly summary of sales and inventory.' },
                        ].map((item) => (
                            <label
                                key={item.id}
                                className="settings-notifications-item flex items-center justify-between rounded-lg border border-zinc-200/50 bg-white px-4 py-3 transition-colors hover:bg-zinc-50/50 dark:border-zinc-700/40 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50"
                            >
                                <div className="settings-notifications-item-info flex flex-col gap-0.5">
                                    <span className="settings-notifications-item-label text-sm font-medium">{item.label}</span>
                                    <span className="settings-notifications-item-desc text-xs text-muted-foreground">{item.desc}</span>
                                </div>
                                <div className="settings-notifications-item-toggle relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full bg-zinc-800 transition-colors has-checked:bg-emerald-500 dark:bg-zinc-600 dark:has-checked:bg-emerald-500">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="settings-notifications-item-checkbox peer sr-only"
                                    />
                                    <span className="settings-notifications-item-thumb inline-block size-3.5 translate-x-1 rounded-full bg-white transition-transform peer-checked:translate-x-[18px]" />
                                </div>
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="settings-security-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="settings-security-card-header">
                    <CardTitle className="settings-security-card-title flex items-center gap-2 text-sm font-semibold">
                        <Shield className="settings-security-card-title-icon size-4" />
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="settings-security-card-body">
                    <div className="settings-security-grid grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <div className="settings-field settings-field--current-password">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>

                        <div className="settings-field settings-field--new-password">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>

                        <div className="settings-field settings-field--confirm-password sm:col-span-2">
                            <label className="settings-field-label mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="settings-field-input w-full rounded-lg border border-zinc-200/70 bg-white px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="settings-security-two-factor mt-5 flex items-center justify-between rounded-lg border border-zinc-200/50 bg-white px-4 py-3 dark:border-zinc-700/40 dark:bg-zinc-800/30">
                        <div className="settings-security-two-factor-info flex flex-col gap-0.5">
                            <span className="settings-security-two-factor-label text-sm font-medium">Two-Factor Authentication</span>
                            <span className="settings-security-two-factor-desc text-xs text-muted-foreground">Add an extra layer of security to your account.</span>
                        </div>
                        <Badge
                            variant="outline"
                            className="settings-security-two-factor-badge rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        >
                            Coming Soon
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="settings-actions flex items-center justify-end gap-3">
                <button className="settings-actions-cancel-btn inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/70 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                    Cancel
                </button>
                <button className="settings-actions-save-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
                    <Save className="settings-actions-save-icon size-4" />
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default Settings
