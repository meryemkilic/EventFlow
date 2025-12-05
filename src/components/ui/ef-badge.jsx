import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const EFBadge = ({ variant = "default", className, children, ...props }) => {
  const variants = {
    default: "bg-white/10 text-white hover:bg-white/20 border-transparent",
    success: "bg-green-500/10 text-green-500 border-green-500/20 border",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20 border",
    error: "bg-red-500/10 text-red-500 border-red-500/20 border",
    live: "bg-red-600 text-white animate-pulse shadow-lg shadow-red-900/40 border-none",
    gold: "bg-yellow-500/10 text-yellow-400 border-yellow-500/50 border shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 border",
    outline: "text-foreground"
  };

  return (
    <Badge 
      className={cn("font-medium px-2.5 py-0.5 transition-colors", variants[variant], className)} 
      variant="outline"
      {...props}
    >
      {children}
    </Badge>
  );
};
