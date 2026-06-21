import { LoginForm } from "@/components/composed";

function BaselineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M176 176H24V161.52H175.994V143.96H24V24H176V176Z" fill="currentColor" />
    </svg>
  );
}

/**
 * AuthSurface — centered sign-in. Composes the interactive LoginForm
 * component (validation, password toggle, submitted state baked in).
 */
export function AuthSurface() {
  return (
    <div
      className="flex min-h-svh items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--bl-bg-body)" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-4">
          <BaselineMark className="h-8 w-8 mb-2 text-[var(--bl-fill-primary)]" />
          <p className="font-heading font-semibold text-sm">Welcome back</p>
          <p className="text-xs text-muted-foreground">Sign in to your Baseline account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
