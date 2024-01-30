import React from "react";
import { cn } from "../../utils/tailwindMerge";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: JSX.Element | string;
  className?: string;
}

export const Label = ({ className, children, ...props }: Props) => {
  return (
    <label
      className={cn("text-xs text-muted-foreground pb-1", className)}
      {...props}
    >
      {children}
    </label>
  );
};