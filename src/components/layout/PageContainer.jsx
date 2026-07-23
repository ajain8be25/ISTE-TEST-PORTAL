/**
 * Shared page wrapper used by every route. Provides consistent
 * background, vertical centering, and responsive horizontal padding.
 */
export default function PageContainer({ children, className = '' }) {
  return (
    <div className="min-h-screen w-full bg-paper text-ink flex flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  )
}
