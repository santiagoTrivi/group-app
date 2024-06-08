/* eslint-disable prettier/prettier */

export const RegistrationTypeConst = {
  join: 'join',
  invited: 'invited',
};

export type RegistrationType = keyof typeof RegistrationTypeConst;
