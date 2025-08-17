import { FilterState } from '@/hooks/useFilter';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function compositeRoute(
  routeTemplate: string,
  params: Record<string, string | number | undefined> = {}
): string {
  return routeTemplate.replace(/:\w+/g, (match) => {
    const key = match.substring(1);
    return encodeURIComponent(String(params[key] || ''));
  });
}
//Example
// const route = compositeRoute('/users/:userId/orders/:orderId', {
//   userId: 123,
//   orderId: 456
// });
export function buildQueryString(filters: Record<string, any>): string {
  return `?${new URLSearchParams(filters).toString()}`;
}

export function parseQueryString(queryString: string): Record<string, any> {
  const filters: Record<string, any> = {};
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key && value) {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);

      const cleanValue = decodedValue.replace(/^"|"$/g, '');

      filters[decodedKey] = isNaN(Number(cleanValue))
        ? cleanValue
        : Number(cleanValue);
    }
  }

  return filters;
}

export function isEmptyObject(object: Record<string, any>): boolean {
  const keys = Object.keys(object);
  return keys.length === 0;
}

export const buildUrlWithQuery = (route: string, filters: FilterState) => {
  const queryString = buildQueryString(filters);
  return `${route}${queryString}`;
};
