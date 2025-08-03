import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validatePhoneNumber(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 9;
}

export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `+996${cleanPhone}`;
}