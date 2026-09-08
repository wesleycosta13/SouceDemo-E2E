import { test, expect } from '../src/fixtures/test.fixture';
import { TEST_USERS, PASSWORD, SORT_OPTIONS, PRODUCTS } from '../src/utils/constants';

test.describe('Catálogo de Produtos e Filtros de Ordenação', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.STANDARD, PASSWORD);
  });

  test('Deve ordenar produtos por Nome (A a Z)', async ({ productsPage }) => {
    await productsPage.sortProductsBy(SORT_OPTIONS.NAME_AZ);
    const names = await productsPage.getAllProductNames();
    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);
  });

  test('Deve ordenar produtos por Nome (Z a A)', async ({ productsPage }) => {
    await productsPage.sortProductsBy(SORT_OPTIONS.NAME_ZA);
    const names = await productsPage.getAllProductNames();
    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
  });

  test('Deve ordenar produtos por Preço (do menor para o maior)', async ({ productsPage }) => {
    await productsPage.sortProductsBy(SORT_OPTIONS.PRICE_LOW_HIGH);
    const prices = await productsPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('Deve ordenar produtos por Preço (do maior para o menor)', async ({ productsPage }) => {
    await productsPage.sortProductsBy(SORT_OPTIONS.PRICE_HIGH_LOW);
    const prices = await productsPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test('Deve adicionar produto ao carrinho e atualizar a contagem no badge', async ({ productsPage }) => {
    await productsPage.addProductToCartByName(PRODUCTS.BACKPACK);
    expect(await productsPage.getCartBadgeCount()).toBe(1);

    await productsPage.addProductToCartByName(PRODUCTS.BIKE_LIGHT);
    expect(await productsPage.getCartBadgeCount()).toBe(2);
  });

  test('Deve remover produto do carrinho diretamente da tela de produtos', async ({ productsPage }) => {
    await productsPage.addProductToCartByName(PRODUCTS.BACKPACK);
    await productsPage.addProductToCartByName(PRODUCTS.BIKE_LIGHT);
    expect(await productsPage.getCartBadgeCount()).toBe(2);

    await productsPage.removeProductFromCartByName(PRODUCTS.BACKPACK);
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });
});
