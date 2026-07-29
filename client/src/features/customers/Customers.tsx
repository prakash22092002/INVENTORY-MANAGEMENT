import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Users,
    Plus,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import type { Customer } from '@/types/customer'
import CustomerFormModal, { type CustomerFormData } from './CustomerFormModal'
import SearchBar from '@/components/common/SearchBar'
import { addCustomerApi, getAllCustomerApi } from '@/services/api/auth'

const Customers = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [customerLoader, setCustomerLoader] = useState(false)
    const [fetchLoader, setFetchLoader] = useState(false)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalCustomers, setTotalCustomers] = useState(0)

    const handleAddCustomerSubmit = async (data: CustomerFormData) => {
        setCustomerLoader(true)
        try {
            const newCustomerPayload: Customer = {
                customerName: data.customerName,
                email: data.email,
                mobileNumber: data.mobileNumber,
                companyName: data.companyName || 'N/A',
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                pinCode: data.pincode,
                pan: data.pan,
            }

            const response = await addCustomerApi(newCustomerPayload)

            if (response && response.data?.customer) {
                setCustomers((prev) => [response.data.customer, ...prev])
            } else {
                setCustomers((prev) => [newCustomerPayload, ...prev])
            }
            setModalOpen(false)
        } catch (error) {
            console.error('Error adding customer:', error)
        } finally {
            setCustomerLoader(false)
        }
    }

    const handleFetchCustomers = async (
        pageNum: number = currentPage,
        size: number = pageSize,
        searchQuery: string = search
    ) => {
        setFetchLoader(true)
        try {
            const payload = {
                page: pageNum - 1,
                pageSize: size,
                limit: size,
                search: searchQuery,
            }

            const response = await getAllCustomerApi(payload)

            if (response && response.data) {
                setCustomers(response.data.customers || [])
                setTotalCustomers(response.data.total ?? response.data.customers?.length ?? 0)
            } else if (Array.isArray(response)) {
                setCustomers(response)
                setTotalCustomers(response.length)
            } else {
                setCustomers([])
                setTotalCustomers(0)
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
        } finally {
            setFetchLoader(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleFetchCustomers(currentPage, pageSize, search)
        }, 300)

        return () => clearTimeout(timer)
    }, [currentPage, pageSize, search])

    // Pagination calculations
    const totalPages = Math.ceil(totalCustomers / pageSize) || 1
    const startIndex = (currentPage - 1) * pageSize

    return (
        <div className="customers flex flex-col gap-6">
            <div className="customers-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="customers-header-info flex flex-col gap-1">
                    <h1 className="customers-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Customers
                    </h1>
                    <p className="customers-header-subtitle text-sm text-muted-foreground">
                        View and manage your customer relationships.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <SearchBar
                        value={search}
                        onChange={(val) => {
                            setSearch(val)
                            setCurrentPage(1)
                        }}
                        onClear={() => {
                            setSearch('')
                            setCurrentPage(1)
                        }}
                        placeholder="Search by customer name..."
                        loading={fetchLoader}
                    />

                    <button
                        onClick={() => setModalOpen(true)}
                        className="customers-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                    >
                        <Plus className="customers-create-btn-icon size-4" />
                        Add Customer
                    </button>
                </div>
            </div>

            <Card className="customers-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="customers-table-card-header">
                    <CardTitle className="customers-table-card-title text-sm font-semibold">
                        All Customers
                    </CardTitle>
                </CardHeader>
                <CardContent className="customers-table-card-body p-0 sm:p-6">
                    <Table className="customers-table">
                        <TableHeader className="customers-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Customer</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Company</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Phone</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="customers-table-body">
                            {fetchLoader ? (
                                <TableRow className="customers-table-loading-row">
                                    <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="size-5 animate-spin text-zinc-500" />
                                            <span>Loading customers...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : customers.length === 0 ? (
                                <TableRow className="customers-table-empty-row">
                                    <TableCell colSpan={5} className="customers-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        {search ? `No customers matching "${search}"` : 'No customers found.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer, idx) => (
                                    <TableRow
                                        key={customer._id || idx}
                                        onClick={() => navigate(`/customers/${customer._id || idx}`)}
                                        className="customers-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                    >
                                        <TableCell className="customers-table-cell customers-table-cell--name py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                    <Users className="size-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm font-medium">{customer.customerName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--email py-3 text-sm text-muted-foreground">
                                            {customer.email}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--company py-3 text-sm text-muted-foreground">
                                            {customer.companyName}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--phone py-3 text-sm text-muted-foreground">
                                            {customer.mobileNumber}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--status py-3 text-right">
                                            <Badge
                                                variant="default"
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                            >
                                                Active
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls Footer */}
                    {totalCustomers > 0 && (
                        <div className="flex flex-col gap-3 px-6 py-4 border-t border-zinc-200/50 dark:border-zinc-700/40 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-xs text-muted-foreground">
                                    Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalCustomers > 0 ? startIndex + 1 : 0}</span> to{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{Math.min(startIndex + customers.length, totalCustomers)}</span> of{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalCustomers}</span> entries
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Rows per page:</span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value))
                                            setCurrentPage(1)
                                        }}
                                        className="h-8 rounded-lg border border-zinc-200/80 bg-white/80 px-2 text-xs font-medium text-zinc-900 outline-none hover:border-zinc-300 dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1 || fetchLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="First Page"
                                >
                                    <ChevronsLeft className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || fetchLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Previous Page"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>

                                <span className="px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || fetchLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Next Page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages || fetchLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Last Page"
                                >
                                    <ChevronsRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <CustomerFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddCustomerSubmit}
                loading={customerLoader}
            />
        </div>
    )
}

export default Customers
