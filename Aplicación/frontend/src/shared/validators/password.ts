export function isValidPassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export const passwordMessage =
  "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";