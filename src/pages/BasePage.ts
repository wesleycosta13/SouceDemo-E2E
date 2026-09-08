import { Page, Locator, expect } from '@playwright/test';

/**
 * Classe base para todos os Page Objects.
 * Centraliza comportamentos comuns e interações genéricas com a página.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega para um caminho relativo à baseURL
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Obtém a URL atual da página
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Retorna o texto contido em um elemento
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }

  /**
   * Aguarda um elemento estar visível
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      return await locator.isVisible();
    } catch {
      return false;
    }
  }
}
