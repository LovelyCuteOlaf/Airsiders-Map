import React, { FC, ComponentProps } from "react";
import { clsx } from "../utils/clsx";

type InputProps = {
  label?: string;
} & ComponentProps<'input'>;

export const Input: FC<InputProps> = (
  {
    label,
    className,
    ...restProps
  }) => {
  return (
    <div className={
      clsx('flex items-center gap-2 flex-1',
        className,
      )}
    >
      {label && <span>{label}</span>}
      <input
        className='w-full outline-none p-1 border-2 border-gray-400 hover:border-primary focus-within:border-primary rounded'
        {...restProps}
      />
    </div>
  )
}
