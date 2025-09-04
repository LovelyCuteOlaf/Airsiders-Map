export const clsx = (...classes: Array<string | undefined | null | false>): string => {
  return classes.filter(Boolean).join(' ');
}
