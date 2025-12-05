import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Design System Button Wrapper
// Variants: primary (default), secondary, ghost, stage
export const EFButton = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-blue-600 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 border-none rounded-full",
    secondary: "bg-card text-secondary-foreground border border-white/10 hover:border-white/20 hover:text-white rounded-xl",
    ghost: "bg-transparent hover:bg-white/5 text-muted-foreground hover:text-white rounded-lg",
    stage: "bg-primary text-white text-xl font-bold px-8 py-6 rounded-2xl shadow-2xl shadow-blue-600/30 hover:scale-105 transition-transform"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
    xl: "h-16 px-10 text-lg" 
  };

  return (
    <Button
      ref={ref}
      className={cn(
        "transition-all duration-200 font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
EFButton.displayName = "EFButton";
