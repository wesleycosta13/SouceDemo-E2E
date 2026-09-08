import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Verifica se a página de carrinho carregou
   */
  async isLoaded(): Promise<boolean> {
    return this.isElementVisible(this.title);
  }

  /**
   * Obtém a lista de nomes dos produtos no carrinho
   */
  async getCartItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /**
   * Retorna a quantidade de itens no carrinho
   */
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * Remove um item específico do carrinho
   */
  async removeItemByName(productName: string): Promise<void> {
    const itemCard = this.cartItems.filter({ hasText: productName });
    const removeButton = itemCard.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Clica no botão de prosseguir para o Checkout
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Clica no botão de continuar comprando
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
