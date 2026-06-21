import * as React from "react";
import { Eye, EyeSlash, CheckCircle } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * LoginForm — sign-in card with password visibility toggle,
 * inline email validation, and a submitted confirmation state.
 * Composes: Card, Input, Label, Button, Checkbox, Phosphor icons.
 */
export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !emailValid;
  const canSubmit = emailValid && password.length >= 1;

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <CheckCircle size={40} weight="fill" style={{ color: "var(--bl-fill-success)" }} />
          <div>
            <p className="font-heading font-semibold">You're signed in</p>
            <p className="text-sm text-muted-foreground">Welcome back to Baseline.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sign in</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) setSubmitted(true);
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={showError}
              aria-describedby={showError ? "login-email-error" : undefined}
            />
            {showError && (
              <p id="login-email-error" className="text-xs" style={{ color: "var(--bl-fill-danger)" }}>
                Enter a valid email address.
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-pass">Password</Label>
            <div className="relative">
              <Input
                id="login-pass"
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors duration-instant hover:text-[var(--bl-fg-primary)]"
                style={{ color: "var(--bl-fg-muted)" }}
              >
                {show ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="login-remember" />
            <Label htmlFor="login-remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            Sign in
          </Button>
          <Button type="button" variant="link" className="text-xs">
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
