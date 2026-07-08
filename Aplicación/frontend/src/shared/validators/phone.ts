export function isValidChileanPhone(phone: string) {
  if (!phone.trim()) return true;

  return /^(\+?56)?9\d{8}$/.test(phone.replace(/\s/g, ""));
}