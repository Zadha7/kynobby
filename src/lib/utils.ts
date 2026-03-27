import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSymbol(currency: string) {
  switch(currency) {
    case "PKR": return "₨";
    case "USD": return "$";
    case "GBP": return "£";
    case "AED": return "د.إ";
    case "SAR": return "﷼";
    case "INR": return "₹";
    default: return "$";
  }
}
