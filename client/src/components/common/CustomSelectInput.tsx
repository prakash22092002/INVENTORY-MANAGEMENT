import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Loader2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAllCategoriesApi } from '@/services/api/auth'
import type { getCategoryPayload } from '@/types/category'

interface CustomSelectInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    onFetchOptions?: () => Promise<string[]>
}

const CustomSelectInput = ({
    value,
    onChange,
    placeholder = 'Select or search...',
    disabled = false,
    className,
    onFetchOptions,
}: CustomSelectInputProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(value || '')
    const [options, setOptions] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [hasFetched, setHasFetched] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Keep internal search term in sync when external value prop changes
    useEffect(() => {
        setSearchTerm(value || '')
    }, [value])

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const fetchOptionsData = async () => {
        if (loading || hasFetched) return
        setLoading(true)
        try {
            if (onFetchOptions) {
                const customList = await onFetchOptions()
                setOptions(customList)
            } else {
                const payload: getCategoryPayload = {
                    page: 0,
                    pageSize: 100,
                }
                const response = await getAllCategoriesApi(payload)

                const rawList =
                    response?.data?.category?.category ||
                    response?.data?.category ||
                    (Array.isArray(response?.data) ? response?.data : [])

                const names: string[] = rawList
                    .map((item: any) =>
                        typeof item === 'string' ? item : item.categoryName || item.name || item.slug || ''
                    )
                    .filter(Boolean)

                setOptions(names)
            }
            setHasFetched(true)
        } catch (error) {
            console.error('Failed to fetch options:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFocus = () => {
        if (!disabled) {
            setIsOpen(true)
            fetchOptionsData()
        }
    }

    const handleSelectOption = (optionValue: string) => {
        setSearchTerm(optionValue)
        onChange(optionValue)
        setIsOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setSearchTerm(val)
        onChange(val)
        if (!isOpen) setIsOpen(true)
    }

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onFocus={handleFocus}
                    onClick={handleFocus}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="h-9 w-full rounded-lg border border-zinc-200 bg-white/60 pl-3 pr-8 text-sm outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                />

                <div className="absolute right-2 flex items-center gap-1 text-zinc-400">
                    {loading ? (
                        <Loader2 className="size-4 animate-spin text-zinc-500" />
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                if (!disabled) {
                                    setIsOpen((prev) => !prev)
                                    if (!isOpen) handleFocus()
                                }
                            }}
                            className="flex size-5 items-center justify-center rounded hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            <ChevronDown
                                className={cn('size-4 transition-transform duration-200', isOpen && 'rotate-180')}
                            />
                        </button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-zinc-200/80 bg-white/90 py-1 shadow-lg backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/90">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 px-3 py-3 text-xs text-muted-foreground">
                            <Loader2 className="size-4 animate-spin text-zinc-500" />
                            <span>Loading options...</span>
                        </div>
                    ) : filteredOptions.length === 0 ? (
                        <div className="px-3 py-2 text-center text-xs text-muted-foreground">
                            No options found.
                        </div>
                    ) : (
                        filteredOptions.map((opt) => {
                            const isSelected = opt.toLowerCase() === value.toLowerCase()
                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleSelectOption(opt)}
                                    className={cn(
                                        'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800',
                                        isSelected &&
                                            'bg-zinc-100/70 font-medium text-zinc-900 dark:bg-zinc-800/70 dark:text-zinc-100'
                                    )}
                                >
                                    <span>{opt}</span>
                                    {isSelected && <Check className="size-4 text-zinc-600 dark:text-zinc-300" />}
                                </button>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}

export default CustomSelectInput
