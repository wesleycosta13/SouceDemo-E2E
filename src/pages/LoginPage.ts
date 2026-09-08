import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessageContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessageContainer = page.locator('[data-test="error"]');
  }

  /**
   * Abre a página de login
   */
  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  /**
   * Preenche o campo de usuário
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Preenche o campo de senha
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clica no botão de login
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Executa o fluxo completo de login
   */
  async login(username?: string, password?: string): Promise<void> {
    if (username !== undefined) {
      await this.fillUsername(username);
    }
    if (password !== undefined) {
      await this.fillPassword(password);
    }
    await this.clickLogin();
  }

  /**
   * Obtém a mensagem de erro exibida na tela de login
   */
  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessageContainer);
  }
}
