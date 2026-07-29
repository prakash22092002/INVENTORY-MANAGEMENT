import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Building,
    FileText,
    Calendar,
    Clock,
    Loader2,
    Hash,
    Copy,
    Check,
    ShieldCheck,
    Globe,
    AlertCircle,
    Trash2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { Customer } from '@/types/customer'
import { getParticularCustomerByIDApi, deleterCustomerByIdApi } from '@/services/api/auth'

const CustomerPreview = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState<Customer | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [copiedField, setCopiedField] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const handleDeleteCustomer = async () => {
        if (!id) return
        try {
            setDeleteLoading(true)
            const response = await deleterCustomerByIdApi(id)
            if (response?.es === 0 || response?.status === 200 || response?.message) {
                toast.success(response?.message || 'Customer deleted successfully')
                navigate(-1)
            } else {
                toast.error(response?.data?.message || response?.message || 'Failed to delete customer')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'An error occurred while deleting customer')
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleCopy = (text: string, fieldName: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopiedField(fieldName)
        toast.success(`${fieldName} copied to clipboard!`)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A'
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        } catch {
            return dateStr
        }
    }

    const getInitials = (name?: string) => {
        if (!name) return 'CU'
        const parts = name.trim().split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name.slice(0, 2).toUpperCase()
    }

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (!id) {
                setError('No Customer ID provided')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)
                const res = await getParticularCustomerByIDApi(id)

                if (res?.es === 0 && res?.data?.customer) {
                    setCustomer(res.data.customer)
                } else if (res?.data?.customer) {
                    setCustomer(res.data.customer)
                } else if (res?.customerName) {
                    setCustomer(res)
                } else {
                    setError(res?.data?.message || 'Customer not found')
                }
            } catch (err: any) {
                console.error('Error fetching customer:', err)
                setError(err?.response?.data?.data?.message || err?.message || 'Failed to load customer details')
            } finally {
                setLoading(false)
            }
        }

        fetchCustomerData()
    }, [id])

    if (loading) {
        return (
            <div className="customer-preview-loading flex flex-col items-center justify-center gap-4 py-32">
                <Loader2 className="size-8 animate-spin text-zinc-500" />
                <p className="text-sm font-medium text-muted-foreground">Loading customer details...</p>
            </div>
        )
    }

    if (error || !customer) {
        return (
            <div className="customer-preview flex flex-col gap-6">
                <div className="customer-preview-back">
                    <button
                        onClick={() => navigate('/customers')}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Customers
                    </button>
                </div>

                <div className="customer-preview-not-found flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200/50 bg-white/60 py-20 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 dark:bg-rose-500/20">
                        <AlertCircle className="size-7" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {error || 'Customer not found'}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            The requested customer record could not be retrieved.
                        </p>
                    </div>
                    <Link
                        to="/customers"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        <ArrowLeft className="size-4" />
                        Return to Customer List
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="customer-preview flex flex-col gap-6">
            {/* Top Bar Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/customers')}
                    className="customer-preview-back-btn inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                    <ArrowLeft className="size-4" />
                    Back to Customers
                </button>

                <div className="flex items-center gap-2">
                    {customer.email && (
                        <a
                            href={`mailto:${customer.email}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                            <Mail className="size-3.5 text-zinc-500" />
                            Send Email
                        </a>
                    )}
                    {customer.mobileNumber && (
                        <a
                            href={`tel:${customer.mobileNumber}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                            <Phone className="size-3.5 text-zinc-500" />
                            Call Customer
                        </a>
                    )}
                    <button
                        onClick={handleDeleteCustomer}
                        disabled={deleteLoading}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 shadow-sm transition-all hover:bg-rose-100 hover:text-rose-700 disabled:opacity-50 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50"
                    >
                        {deleteLoading ? (
                            <Loader2 className="size-3.5 animate-spin text-rose-600 dark:text-rose-400" />
                        ) : (
                            <Trash2 className="size-3.5 text-rose-600 dark:text-rose-400" />
                        )}
                        Delete Customer
                    </button>
                </div>
            </div>

            {/* Hero Banner Card */}
            <div className="customer-preview-hero relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/60 p-6 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <div className="customer-preview-headder flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4 sm:items-center">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-lg font-bold text-white shadow-md dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900">
                            {getInitials(customer.customerName)}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
                                    {customer.customerName}
                                </h1>
                                <Badge className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 border border-emerald-500/30 dark:text-emerald-400">
                                    <ShieldCheck className="mr-1 size-3 inline" />
                                    Active Customer
                                </Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground flex flex-wrap items-center gap-2">
                                {customer.companyName && (
                                    <span className="flex items-center gap-1">
                                        <Building className="size-3.5 text-zinc-400" />
                                        {customer.companyName}
                                    </span>
                                )}
                                {customer.companyName && (customer.city || customer.country) && <span>&middot;</span>}
                                {(customer.city || customer.country) && (
                                    <span className="flex items-center gap-1">
                                        <Globe className="size-3.5 text-zinc-400" />
                                        {[customer.city, customer.state, customer.country].filter(Boolean).join(', ')}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Personal & Contact Info Card */}
                <Card className="border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                            <Users className="size-4 text-zinc-500" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex flex-col gap-3">
                        <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    <Users className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Full Name</span>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{customer.customerName || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    <Mail className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Email Address</span>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{customer.email || 'N/A'}</span>
                                </div>
                            </div>
                            {customer.email && (
                                <button
                                    onClick={() => handleCopy(customer.email, 'Email')}
                                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                    title="Copy Email"
                                >
                                    {copiedField === 'Email' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                                </button>
                            )}
                        </div>

                        <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    <Phone className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Mobile Number</span>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{customer.mobileNumber || 'N/A'}</span>
                                </div>
                            </div>
                            {customer.mobileNumber && (
                                <button
                                    onClick={() => handleCopy(customer.mobileNumber, 'Mobile Number')}
                                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                    title="Copy Mobile Number"
                                >
                                    {copiedField === 'Mobile Number' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                                </button>
                            )}
                        </div>

                        <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    <Building className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Company Name</span>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{customer.companyName || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Information Card */}
                <Card className="border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                            <MapPin className="size-4 text-zinc-500" />
                            Address & Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex flex-col gap-3">
                        <div className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 mt-0.5">
                                <MapPin className="size-4" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Street Address</span>
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{customer.address || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">City</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{customer.city || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">State</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{customer.state || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Country</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{customer.country || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Pin / Postal Code</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{customer.pinCode || 'N/A'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Identification & Financial Information */}
                <Card className="border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                            <FileText className="size-4 text-zinc-500" />
                            Tax & Tax Identification
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex flex-col gap-3">
                        <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    <FileText className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">PAN Number</span>
                                    <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{customer.pan || 'N/A'}</span>
                                </div>
                            </div>
                            {customer.pan && (
                                <button
                                    onClick={() => handleCopy(customer.pan, 'PAN Number')}
                                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                    title="Copy PAN Number"
                                >
                                    {copiedField === 'PAN Number' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* System & Metadata Card */}
                <Card className="border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                            <Clock className="size-4 text-zinc-500" />
                            System Audit & Metadata
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 flex flex-col gap-3">
                        {customer._id && (
                            <div className="group flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                        <Hash className="size-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Customer ID</span>
                                        <span className="font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300">{customer._id}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(customer._id!, 'Customer ID')}
                                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                    title="Copy Customer ID"
                                >
                                    {copiedField === 'Customer ID' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <Calendar className="size-3 text-zinc-400" />
                                    Created At
                                </span>
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{formatDate(customer.createdAt)}</span>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-zinc-50/70 p-3 dark:bg-zinc-800/30">
                                <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <Clock className="size-3 text-zinc-400" />
                                    Updated At
                                </span>
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{formatDate(customer.updatedAt)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CustomerPreview

