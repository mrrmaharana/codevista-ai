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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-accent-yellow text-background hover:bg-[#E5B400] focus:ring-accent-yellow",
    secondary: "bg-secondary text-light hover:bg-[#0D3A45] focus:ring-secondary",
    outline: "border-2 border-secondary text-light hover:bg-secondary focus:ring-secondary",
    ghost: "text-light hover:bg-white/5 focus:ring-light",
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
