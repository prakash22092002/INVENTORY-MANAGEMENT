import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuthStore()

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800 dark:border-zinc-600 dark:border-t-zinc-200" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
