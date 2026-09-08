export const TEST_USERS = {
  STANDARD: 'standard_user',
  LOCKED_OUT: 'locked_out_user',
  PROBLEM: 'problem_user',
  PERFORMANCE_GLITCH: 'performance_glitch_user',
  INVALID: 'user_invalido_123',
};

export const PASSWORD = 'secret_sauce';
export const INVALID_PASSWORD = 'senha_errada';

export const ERROR_MESSAGES = {
  LOCKED_OUT_USER: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  EMPTY_USERNAME: 'Epic sadface: Username is required',
  EMPTY_PASSWORD: 'Epic sadface: Password is required',
  MISSING_FIRST_NAME: 'Error: First Name is required',
  MISSING_LAST_NAME: 'Error: Last Name is required',
  MISSING_POSTAL_CODE: 'Error: Postal Code is required',
};

export const SORT_OPTIONS = {
  NAME_AZ: 'az',
  NAME_ZA: 'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
} as const;

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_SHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  RED_SHIRT: 'Test.allTheThings() T-Shirt (Red)',
};
