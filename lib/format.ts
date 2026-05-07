/** Currency, area, and other small formatters. */

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return cad.format(value);
}

const num = new Intl.NumberFormat("en-CA");

export function formatSqft(value: number): string {
  return `${num.format(value)} sqft`;
}
