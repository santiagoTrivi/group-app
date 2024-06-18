export function AuthBearer(token: string) {
  return `Bearer ${token}`;
}
