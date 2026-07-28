import { useState, useRef, useEffect } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    onClear?: () => void
    placeholder?: string
    loading?: boolean
    className?: string
    expandedWidth?: string
}

const SearchBar = ({
    value,
    onChange,
    onClear,
    placeholder = 'Search...',
    loading = false,
    className,
    expandedWidth = 'w-48 sm:w-56',
}: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(Boolean(value))
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Expand search automatically if value exists on mount or updates externally
    useEffect(() => {
        if (value) {
            setIsOpen(true)
        }
    }, [value])

    // Click outside to collapse if empty
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                if (!value) {
                    setIsOpen(false)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [value])

    const handleOpen = () => {
        setIsOpen(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 50)
    }

    const handleClear = () => {
        onChange('')
        if (onClear) {
            onClear()
        }
        setIsOpen(false)
    }

    return (
        <div ref={searchRef} className={cn('relative flex items-center', className)}>
            <div
                className={cn(
                    'relative flex h-10 items-center overflow-hidden transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                    isOpen
                        ? cn(expandedWidth, 'rounded-xl border border-zinc-300/80 bg-white/90 shadow-md backdrop-blur-xl ring-2 ring-zinc-900/5 dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:ring-zinc-100/10')
                        : 'w-10 rounded-full border border-zinc-200/80 bg-white/60 shadow-sm hover:border-zinc-300 hover:bg-zinc-100/80 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/90'
                )}
            >
                <button
                    type="button"
                    onClick={() => {
                        if (!isOpen) handleOpen()
                        else inputRef.current?.focus()
                    }}
                    className="flex size-10 items-center justify-center text-zinc-500 transition-all duration-500 shrink-0 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-90"
                    title={placeholder}
                >
                    {loading ? (
                        <Loader2 className="size-4 animate-spin text-zinc-600 dark:text-zinc-300" />
                    ) : (
                        <Search
                            className={cn(
                                'size-4 transition-transform duration-700',
                                isOpen ? 'scale-105 text-zinc-900 dark:text-zinc-100' : 'scale-100'
                            )}
                        />
                    )}
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleClear()
                        }
                    }}
                    placeholder={placeholder}
                    className={cn(
                        'w-full bg-transparent py-2 pr-8 text-sm outline-none placeholder:text-muted-foreground/60 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                        isOpen
                            ? 'opacity-100 translate-x-0 delay-200 pointer-events-auto'
                            : 'opacity-0 -translate-x-3 pointer-events-none'
                    )}
                />

                {isOpen && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={cn(
                            'absolute right-2 flex size-6 items-center justify-center rounded-full text-zinc-400 transition-all duration-500 hover:bg-zinc-200/80 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 active:scale-90',
                            value ? 'opacity-100 scale-100' : 'opacity-70 hover:opacity-100 scale-95'
                        )}
                        title="Clear or close search"
                    >
                        <X className="size-3.5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar
