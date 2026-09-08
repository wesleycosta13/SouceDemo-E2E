import { test, expect } from '../src/fixtures/test.fixture';
import { TEST_USERS, PASSWORD, PRODUCTS } from '../src/utils/constants';

test.describe('Gerenciamento do Carrinho de Compras', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.STANDARD, PASSWORD);
    await productsPage.addProductToCartByName(PRODUCTS.BACKPACK);
    await productsPage.addProductToCartByName(PRODUCTS.BOLT_SHIRT);
    await productsPage.goToCart();
  });

  test('Deve exibir os produtos adicionados na lista do carrinho', async ({ cartPage }) => {
    expect(await cartPage.isLoaded()).toBeTruthy();
    
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(PRODUCTS.BACKPACK);
    expect(itemNames).toContain(PRODUCTS.BOLT_SHIRT);
    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('Deve permitir remover um item de dentro do carrinho', async ({ cartPage }) => {
    await cartPage.removeItemByName(PRODUCTS.BACKPACK);
    
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).not.toContain(PRODUCTS.BACKPACK);
    expect(itemNames).toContain(PRODUCTS.BOLT_SHIRT);
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('Deve permitir retornar para a lista de produtos usando Continue Shopping', async ({ cartPage, productsPage }) => {
    await cartPage.clickContinueShopping();
    
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(await productsPage.getCurrentUrl()).toContain('/inventory.html');
  });
});
