import React, { FC, ComponentProps, useMemo } from "react";
import { clsx } from "../utils/clsx";

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'contained' | 'outlined',
  color?: 'primary' | 'secondary',
}

export const Button: FC<ButtonProps> = (
  {
    variant = 'contained',
    color= 'primary',
    className,
    children,
    ...restProps
  }) => {
  const buttonClass = useMemo(() => {
    return {
      contained: {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-white',
      },
      outlined: {
        primary: 'bg-white border-primary hover:bg-primary hover:border-transparent',
        secondary: 'bg-white border-secondary',
      },
    }
  }, [variant, color]);

  return (
    <button className={
      clsx(
        'inline-flex items-center justify-center px-4 py-1.5 rounded disabled:bg-gray-300',
        'transition-all duration-500 cursor-pointer',
        className,
        buttonClass[variant][color]
      )}
         {...restProps}
    >
      {children}
    </button>
  )
}
