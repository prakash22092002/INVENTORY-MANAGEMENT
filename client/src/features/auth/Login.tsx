import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signInApi } from '@/services/api/auth'
import { toast } from 'sonner'

function Login() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await signInApi({ email, password });

            if (res?.data?.user?.accessToken) {
                localStorage.setItem('accessToken', res?.data?.user?.accessToken)
                localStorage.setItem('userName', res?.data?.user?.name)
                localStorage.setItem('userEmail', res?.data?.user?.email)
            }

            toast.success(res.data?.message || 'Logged in successfully!')

            navigate('/')
        } catch (err: any) {
            const errMsg = err.response?.data?.data?.message || err.message || 'Login failed'
            toast.error(errMsg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
            {/* bg mesh */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-gradient-to-r from-violet-400/30 to-purple-300/20 blur-3xl dark:from-violet-600/20 dark:to-purple-500/10" />
                <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-gradient-to-l from-sky-400/25 to-indigo-300/15 blur-3xl dark:from-sky-600/15 dark:to-indigo-500/10" />
                <div className="absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-300/15 to-orange-200/10 blur-3xl dark:from-amber-600/10 dark:to-orange-500/5" />
            </div>

            <div className="w-full max-w-sm animate-[fadeIn_0.6s_ease-out]">
                {/* header */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-lg shadow-zinc-900/20 ring-1 ring-zinc-800/50 dark:from-white dark:to-zinc-300 dark:ring-white/20">
                        <Sparkles className="size-6 text-white dark:text-zinc-900" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
                </div>

                {/* card */}
                <form
                    onSubmit={handleSubmit}
                    className="group/card rounded-2xl border border-zinc-200/60 bg-white/70 p-7 shadow-lg shadow-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:shadow-xl dark:border-zinc-700/50 dark:bg-zinc-900/70 dark:hover:border-zinc-600/50"
                >
                    {/* {error && (
                        <div className="mb-5 animate-[fadeIn_0.3s] rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive shadow-sm">
                            {error}
                        </div>
                    )} */}

                    <div className="space-y-5">
                        {/* email */}
                        <div className="group/field relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 group-focus-within/field:text-zinc-700 dark:group-focus-within/field:text-zinc-300" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className={cn(
                                    'peer w-full rounded-xl border border-zinc-200/70 bg-white/50 py-3 pl-10 pr-3.5 text-sm outline-none transition-all duration-200',
                                    'placeholder:text-zinc-400',
                                    'focus:border-zinc-400 focus:bg-white/80 focus:shadow-sm focus:ring-4 focus:ring-zinc-900/5',
                                    'dark:border-zinc-700/60 dark:bg-zinc-800/40 dark:focus:border-zinc-500 dark:focus:bg-zinc-800/60 dark:focus:ring-white/5',
                                )}
                            />
                            {/* <label
                                htmlFor="email"
                                className="absolute -top-2 left-2.5 z-10 hidden px-1.5 text-[11px] font-medium text-zinc-500 transition-all duration-200 peer-focus:inline-flex peer-[&:not(:placeholder-shown)]:inline-flex dark:text-zinc-400"
                            >
                                Email
                            </label> */}
                        </div>

                        {/* password */}
                        <div className="group/field relative">
                            <Lock className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 group-focus-within/field:text-zinc-700 dark:group-focus-within/field:text-zinc-300" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className={cn(
                                    'peer w-full rounded-xl border border-zinc-200/70 bg-white/50 py-3 pl-10 pr-10 text-sm outline-none transition-all duration-200',
                                    'placeholder:text-zinc-400',
                                    'focus:border-zinc-400 focus:bg-white/80 focus:shadow-sm focus:ring-4 focus:ring-zinc-900/5',
                                    'dark:border-zinc-700/60 dark:bg-zinc-800/40 dark:focus:border-zinc-500 dark:focus:bg-zinc-800/60 dark:focus:ring-white/5',
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            'mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200',
                            'bg-zinc-900 text-white shadow-sm shadow-zinc-900/10',
                            'hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-900/15',
                            'active:scale-[0.98]',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
                            'dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
                        )}
                    >
                        {isLoading ? (
                            <div className="size-4 animate-spin rounded-full border-2 border-white/25 border-t-white dark:border-zinc-900/25 dark:border-t-zinc-900" />
                        ) : (
                            <>
                                <LogIn className="size-4" />
                                Sign In
                            </>
                        )}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-200/60 dark:border-zinc-700/40" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white/70 px-3 text-[11px] text-zinc-400 dark:bg-zinc-900/70 dark:text-zinc-500">
                                New here?
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/signup"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/70 py-3 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100/80 hover:shadow-sm active:scale-[0.98] dark:border-zinc-700/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
                    >
                        Create an account
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
