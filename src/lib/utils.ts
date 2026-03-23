import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDayRange(startDate: string, endDate?: string) {
  const now = new Date(endDate || Date.now());
  const start = new Date(startDate);
  const differenceMs = +now - +start;
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
}
