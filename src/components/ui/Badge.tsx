import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1",
        "text-xs font-medium text-zinc-600 shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
