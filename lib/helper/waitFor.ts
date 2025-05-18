export function watiFor(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
