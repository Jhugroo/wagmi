import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  return (str.charAt(0).toUpperCase() + str.slice(1))
}

export function capitalizeFirstLetterEachWord(str: string) {
  return (str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
}

export function limitStringCharacterCount(str: string, count = 80) {
  return str.substring(0, count) + (str.length > count ? '...' : '');
}

export function dateFormatter(date: string) {
  const d = new Date(date);
  return d.getTime()
}

export function dateFormatterDisplay(dateString: string | Date, options: object = { day: '2-digit', month: 'short', year: 'numeric' }) {
  const date = new Date(dateString);

  return date.toLocaleString('en-gb', options)
}
export function splitByLastSpace(str: string) {
  const lastSpaceIndex = str.lastIndexOf(' ');
  if (lastSpaceIndex === -1) {
    return [str, ''];
  }
  const part1 = str.substring(0, lastSpaceIndex);
  const part2 = str.substring(lastSpaceIndex + 1);
  return [part1, part2];
}