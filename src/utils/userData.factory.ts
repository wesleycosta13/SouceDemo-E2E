import { faker } from '@faker-js/faker/locale/pt_BR';

export interface CheckoutUserInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class UserDataFactory {
  /**
   * Gera dados aleatórios e realistas para preenchimento do formulário de checkout
   */
  static generateCheckoutUserInfo(): CheckoutUserInfo {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####-###'),
    };
  }
}
