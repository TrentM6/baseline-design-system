import * as React from "react";
import {
  CheckCircle,
  Info,
  CircleNotch,
  XCircle,
  Warning,
} from "@phosphor-icons/react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toaster -Baseline-themed sonner. Reads our `data-mode` attribute
 * (not next-themes) and uses Phosphor icons. Styling flows through
 * --bl-* tokens via the mapped Tailwind color utilities.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = React.useState<"dark" | "light">(() =>
    (document.documentElement.getAttribute("data-mode") as "dark" | "light") ??
    "dark"
  );

  React.useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme((el.getAttribute("data-mode") as "dark" | "light") ?? "dark");
    });
    observer.observe(el, { attributes: true, attributeFilter: ["data-mode"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckCircle weight="fill" className="h-4 w-4" />,
        info: <Info weight="fill" className="h-4 w-4" />,
        warning: <Warning weight="fill" className="h-4 w-4" />,
        error: <XCircle weight="fill" className="h-4 w-4" />,
        loading: <CircleNotch className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
