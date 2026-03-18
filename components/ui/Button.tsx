import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white border-2 border-dark shadow-[var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] active:translate-y-[1px] active:shadow-[var(--shadow-sm)]",
  secondary:
    "bg-secondary text-dark border-2 border-dark shadow-[var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] active:translate-y-[1px] active:shadow-[var(--shadow-sm)]",
  outline:
    "bg-transparent text-dark border-2 border-dark shadow-[var(--shadow-md)] hover:bg-muted hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] active:translate-y-[1px] active:shadow-[var(--shadow-sm)]",
  ghost:
    "bg-transparent text-dark border-2 border-transparent hover:border-dark hover:bg-muted",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-sans font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
