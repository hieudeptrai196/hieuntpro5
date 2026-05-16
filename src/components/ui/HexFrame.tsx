import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * HexFrame — bevelled, Hextech-style container.
 * Renders a double-bordered angular panel à la League of Legends UI.
 */
export function HexFrame({
  children,
  className,
  glow = false,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  as?: "div" | "article" | "section";
}) {
  return (
    <Component
      className={cn(
        "relative bg-gradient-to-b from-void-900 to-void-800 corner-bracket gold-border",
        glow && "glow-gold",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * GoldDivider — ornamental gold separator with a central diamond,
 * used to break content blocks like LoL splash separators.
 */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-hex-600 to-hex-600" />
      <span
        className="block w-2 h-2 rotate-45 bg-hex-400"
        aria-hidden
      />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-hex-600 to-hex-600" />
    </div>
  );
}
