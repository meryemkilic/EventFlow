import React from 'react';
import { cn } from "@/lib/utils";

// Design System Card Wrapper
export const EFCard = React.forwardRef(({ className, gradient = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/10 bg-card text-card-foreground shadow-sm transition-all duration-200",
        gradient && "bg-gradient-to-br from-card via-card to-blue-950/20", // Subtle gradient hint
        className
      )}
      {...props}
    />
  );
});
EFCard.displayName = "EFCard";

export const EFCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
EFCardHeader.displayName = "EFCardHeader";

export const EFCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight font-display",
      className
    )}
    {...props}
  />
));
EFCardTitle.displayName = "EFCardTitle";

export const EFCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
EFCardContent.displayName = "EFCardContent";
