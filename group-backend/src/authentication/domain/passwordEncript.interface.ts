/* eslint-disable prettier/prettier */
export interface PasswordEncriptInterface {
  hash(input: string): Promise<string>;
  compare(input: string, hash: string): Promise<boolean>;
}
