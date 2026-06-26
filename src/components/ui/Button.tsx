import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background group active:scale-95";
  
  const variants = {
    primary: "bg-accent-yellow text-background hover:bg-[#ffe47a] hover:shadow-[0_0_34px_rgba(255,210,63,0.36)] hover:-translate-y-1 focus:ring-accent-yellow",
    secondary: "bg-secondary text-light hover:bg-[#16808c] hover:shadow-[0_0_26px_rgba(93,226,231,0.25)] hover:-translate-y-1 focus:ring-secondary",
    outline: "border border-white/20 text-light hover:bg-white/[0.08] hover:border-accent-cyan/50 hover:-translate-y-1 focus:ring-light",
    ghost: "text-light hover:bg-white/10 hover:text-accent-yellow focus:ring-light",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
