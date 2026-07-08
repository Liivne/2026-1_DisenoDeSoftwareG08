export function formatRut(value: string) {
  const clean = value
    .replace(/\./g, "")
    .replace(/-/g, "")
    .toUpperCase();

  if (clean.length <= 1) {
    return clean;
  }

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  return (
    body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
    "-" +
    dv
  );
}