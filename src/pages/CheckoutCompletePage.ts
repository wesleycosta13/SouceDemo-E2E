import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Obtém a mensagem principal de sucesso da compra
   */
  async getCompleteHeaderMessage(): Promise<string> {
    return this.getElementText(this.completeHeader);
  }

  /**
   * Clica no botão de voltar para a página inicial de produtos
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
