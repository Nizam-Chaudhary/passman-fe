import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function makeQueryString(
    params: Record<string, string | number | boolean | undefined | null>
) {
    const results = Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    return results ? `?${results}` : "";
}
