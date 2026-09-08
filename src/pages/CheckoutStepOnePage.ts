import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutUserInfo } from '../utils/userData.factory';

export class CheckoutStepOnePage extends BasePage {
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessageContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessageContainer = page.locator('[data-test="error"]');
  }

  /**
   * Preenche as informações do comprador no formulário
   */
  async fillInformation(userInfo: Partial<CheckoutUserInfo>): Promise<void> {
    if (userInfo.firstName !== undefined) {
      await this.firstNameInput.fill(userInfo.firstName);
    }
    if (userInfo.lastName !== undefined) {
      await this.lastNameInput.fill(userInfo.lastName);
    }
    if (userInfo.postalCode !== undefined) {
      await this.postalCodeInput.fill(userInfo.postalCode);
    }
  }

  /**
   * Clica no botão de continuar para a próxima etapa do checkout
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Cancela o checkout e retorna ao carrinho
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Obtém a mensagem de erro da validação do formulário
   */
  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessageContainer);
  }
}
