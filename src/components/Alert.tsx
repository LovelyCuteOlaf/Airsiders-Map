import React, { FC, ComponentProps, useMemo } from "react";
import { clsx } from "../utils/clsx";

interface AlertProps extends ComponentProps<'div'> {
  variant?: 'contained' | 'outlined',
  color?: 'primary' | 'secondary' | 'warning',
}

export const Alert: FC<AlertProps> = (
  {
    variant = 'contained',
    color= 'primary',
    className,
    children,
    ...restProps
  }) => {
  const alertClass = useMemo(() => {
    return {
      contained: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        warning: 'bg-amber-500',
      },
      outlined: {
        primary: 'bg-white border-primary',
        secondary: 'bg-white border-secondary',
        warning: 'text-amber-500 border-amber-500 bg-white',
      },
    }
  }, [variant, color]);

  return (
    <div className={
      clsx(
        'absolute left-1/2 top-10 z-[600] rounded b-2 p-2 -translate-x-1/2',
        className,
        alertClass[variant][color]
      )}
         {...restProps}
    >
      {children}
    </div>
  )
}
