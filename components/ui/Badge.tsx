import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "accent" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:   "bg-primary text-white border-dark",
  secondary: "bg-secondary text-dark border-dark",
  accent:    "bg-accent text-dark border-dark",
  muted:     "bg-muted text-muted-foreground border-border",
};

export default function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
