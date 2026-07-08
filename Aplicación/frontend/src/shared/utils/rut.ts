export function cleanRut(rut: string) {
  return rut.replace(/[.-]/g, "").toUpperCase();
}

export function formatRut(rut?: string | null) {
  if (!rut) return "-";

  const clean = cleanRut(rut);

  if (clean.length <= 1) return clean;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
}

export function isValidRut(rut: string) {
  const clean = cleanRut(rut);

  if (!/^\d{7,8}[0-9K]$/.test(clean)) {
    return false;
  }

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expected = 11 - (sum % 11);

  const expectedDv =
    expected === 11
      ? "0"
      : expected === 10
        ? "K"
        : String(expected);

  return dv === expectedDv;
}