import { ComponentPropsWithoutRef, forwardRef } from "react";

export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full ${className}`}
      {...props}
    />
  );
}

export const Section = forwardRef<HTMLElement, ComponentPropsWithoutRef<"section">>(
  ({ className = "", id, children, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`py-16 md:py-24 lg:py-32 overflow-hidden relative ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";
