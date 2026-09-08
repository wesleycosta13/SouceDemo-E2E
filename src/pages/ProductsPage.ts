import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly sortSelect: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Verifica se a página de produtos carregou
   */
  async isLoaded(): Promise<boolean> {
    return this.isElementVisible(this.title);
  }

  /**
   * Ordena os produtos selecionando uma opção (ex: 'az', 'za', 'lohi', 'hilo')
   */
  async sortProductsBy(optionValue: string): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  /**
   * Obtém a lista de nomes de todos os produtos visíveis
   */
  async getAllProductNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /**
   * Obtém a lista de preços numéricos de todos os produtos visíveis
   */
  async getAllProductPrices(): Promise<number[]> {
    const rawPrices = await this.itemPrices.allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace('$', '')));
  }

  /**
   * Adiciona um produto ao carrinho com base no nome exato
   */
  async addProductToCartByName(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const addButton = productCard.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  /**
   * Remove um produto do carrinho a partir da tela de produtos
   */
  async removeProductFromCartByName(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const removeButton = productCard.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Obtém a quantidade exibida no contador do ícone do carrinho
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.isElementVisible(this.shoppingCartBadge)) {
      const countText = await this.shoppingCartBadge.textContent();
      return countText ? parseInt(countText, 10) : 0;
    }
    return 0;
  }

  /**
   * Clica no ícone do carrinho para navegar para a tela de carrinho
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
