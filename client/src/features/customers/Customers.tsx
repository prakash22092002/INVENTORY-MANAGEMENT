import { useState } from 'react'
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
import { Users, Plus } from 'lucide-react'
import { mockCustomers, customerStatusVariant } from '@/data/customers'
import type { Customer } from '@/types/customer'
import CustomerFormModal, { type CustomerFormData } from './CustomerFormModal'

const Customers = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
    const [modalOpen, setModalOpen] = useState(false)

    const handleAddCustomerSubmit = (data: CustomerFormData) => {
        const newCustomer: Customer = {
            id: `CUST-${String(mockCustomers.length + 1).padStart(3, '0')}`,
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company || 'N/A',
            totalOrders: 0,
            totalSpent: 0,
            status: data.status,
            joinDate: new Date().toISOString().split('T')[0],
            lastOrderDate: 'Never',
            address: data.address,
            city: data.city,
            country: data.country,
            state: data.state,
            pincode: data.pincode,
            vatNumber: data.vatNumber,
        }
        mockCustomers.unshift(newCustomer)
        setCustomers([newCustomer, ...customers])
    }

    return (
        <div className="customers flex flex-col gap-6">
            <div className="customers-header flex items-center justify-between">
                <div className="customers-header-info flex flex-col gap-1">
                    <h1 className="customers-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Customers
                    </h1>
                    <p className="customers-header-subtitle text-sm text-muted-foreground">
                        View and manage your customer relationships.
                    </p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="customers-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                >
                    <Plus className="customers-create-btn-icon size-4" />
                    Add Customer
                </button>
            </div>

            <Card className="customers-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="customers-table-card-header">
                    <CardTitle className="customers-table-card-title text-sm font-semibold">
                        All Customers
                    </CardTitle>
                </CardHeader>
                <CardContent className="customers-table-card-body">
                    <Table className="customers-table">
                        <TableHeader className="customers-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Customer</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Company</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Orders</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Spent</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="customers-table-body">
                            {customers.length === 0 ? (
                                <TableRow className="customers-table-empty-row">
                                    <TableCell colSpan={6} className="customers-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer) => (
                                    <TableRow
                                        key={customer.id}
                                        onClick={() => navigate(`/customers/${customer.id}`)}
                                        className="customers-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                    >
                                        <TableCell className="customers-table-cell customers-table-cell--name py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                    <Users className="size-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm font-medium">{customer.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--email py-3 text-sm text-muted-foreground">
                                            {customer.email}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--company py-3 text-sm text-muted-foreground">
                                            {customer.company}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--orders py-3 text-right text-sm">
                                            {customer.totalOrders}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--spent py-3 text-right text-sm font-medium">
                                            ${customer.totalSpent.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="customers-table-cell customers-table-cell--status py-3 text-right">
                                            <Badge
                                                variant={customerStatusVariant[customer.status]}
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                            >
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <CustomerFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddCustomerSubmit}
            />
        </div>
    )
}

export default Customers
