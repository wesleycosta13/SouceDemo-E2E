import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * Obtém a lista de itens no resumo do pedido
   */
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /**
   * Retorna o valor do subtotal formatado ou numérico
   */
  async getSubtotalText(): Promise<string> {
    return this.getElementText(this.subtotalLabel);
  }

  /**
   * Retorna o valor do total final
   */
  async getTotalText(): Promise<string> {
    return this.getElementText(this.totalLabel);
  }

  /**
   * Finaliza o pedido clicando em Finish
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Cancela a finalização e retorna aos produtos
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
