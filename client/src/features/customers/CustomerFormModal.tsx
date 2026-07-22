import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Customer } from '@/types/customer'

export type CustomerFormData = {
    name: string
    phone: string
    email: string
    company: string
    address: string
    country: string
    state: string
    city: string
    pincode: string
    vatNumber: string
    status: 'Active' | 'Inactive'
}

type CustomerFormModalProps = {
    open: boolean
    onClose: () => void
    onSubmit: (data: CustomerFormData) => void
    customer?: Customer
}

const emptyForm: CustomerFormData = {
    name: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    vatNumber: '',
    status: 'Active',
}

const CustomerFormModal = ({ open, onClose, onSubmit, customer }: CustomerFormModalProps) => {
    const [form, setForm] = useState<CustomerFormData>(emptyForm)

    useEffect(() => {
        if (customer) {
            setForm({
                name: customer.name || '',
                phone: customer.phone || '',
                email: customer.email || '',
                company: customer.company || '',
                address: customer.address || '',
                country: customer.country || '',
                state: customer.state || '',
                city: customer.city || '',
                pincode: customer.pincode || '',
                vatNumber: customer.vatNumber || '',
                status: customer.status || 'Active',
            })
        } else {
            setForm(emptyForm)
        }
    }, [customer, open])

    const handleChange = (field: keyof CustomerFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
        onClose()
    }

    const isEdit = !!customer

    return (
        <>
            {open && (
                <div
                    className="customer-form-modal-backdrop fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}
            <div
                className={cn(
                    'customer-form-modal-panel fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-700/40 dark:bg-zinc-900/80',
                    open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
                )}
            >
                <div className="customer-form-modal-header flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
                    <h2 className="customer-form-modal-title text-base font-semibold text-zinc-900 dark:text-zinc-50">
                        {isEdit ? 'Edit Customer' : 'Create Customer'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="customer-form-modal-close-btn flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X className="customer-form-modal-close-icon size-4 text-zinc-500 dark:text-zinc-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="customer-form-modal-form space-y-4 px-6 py-5">
                    <div className="customer-form-modal-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., John Doe"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., +1 (555) 000-0000"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., john@example.com"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., Acme Corp (Optional)"
                            />
                        </div>
                    </div>

                    <div className="customer-form-modal-field flex flex-col gap-1.5">
                        <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Address
                        </label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            required
                            className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                            placeholder="E.g., 123 Main St"
                        />
                    </div>

                    <div className="customer-form-modal-grid-three grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Country
                            </label>
                            <input
                                type="text"
                                value={form.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., United States"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                State
                            </label>
                            <input
                                type="text"
                                value={form.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., California"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                City
                            </label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., San Francisco"
                            />
                        </div>
                    </div>

                    <div className="customer-form-modal-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Pincode / ZIP Code
                            </label>
                            <input
                                type="text"
                                value={form.pincode}
                                onChange={(e) => handleChange('pincode', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., 94103"
                            />
                        </div>

                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                VAT / PAN Number
                            </label>
                            <input
                                type="text"
                                value={form.vatNumber}
                                onChange={(e) => handleChange('vatNumber', e.target.value)}
                                required
                                className="customer-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                                placeholder="E.g., VAT123456789"
                            />
                        </div>
                    </div>

                    {isEdit && (
                        <div className="customer-form-modal-field flex flex-col gap-1.5">
                            <label className="customer-form-modal-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) => handleChange('status', e.target.value as 'Active' | 'Inactive')}
                                className="customer-form-modal-select h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus:border-zinc-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    )}

                    <div className="customer-form-modal-actions flex items-center justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="customer-form-modal-cancel-btn rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100/70 hover:text-zinc-800 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="customer-form-modal-submit-btn rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                        >
                            {isEdit ? 'Save Changes' : 'Create Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CustomerFormModal
