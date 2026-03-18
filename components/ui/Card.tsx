import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border-2 border-dark rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-6",
        hover &&
          "transition-all duration-150 hover:translate-y-[-3px] hover:shadow-[var(--shadow-lg)] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
