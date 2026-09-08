import { test, expect } from '../src/fixtures/test.fixture';
import { TEST_USERS, PASSWORD, PRODUCTS, ERROR_MESSAGES } from '../src/utils/constants';
import { UserDataFactory } from '../src/utils/userData.factory';

test.describe('Processo de Checkout', () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.STANDARD, PASSWORD);
    await productsPage.addProductToCartByName(PRODUCTS.BACKPACK);
    await productsPage.addProductToCartByName(PRODUCTS.FLEECE_JACKET);
    await productsPage.goToCart();
    await cartPage.clickCheckout();
  });

  test('Deve concluir a compra com sucesso fornecendo dados válidos (Cenário Positivo E2E)', async ({
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // 1. Preenchimento de dados gerados dinamicamente com Faker.js
    const randomUser = UserDataFactory.generateCheckoutUserInfo();
    await checkoutStepOnePage.fillInformation(randomUser);
    await checkoutStepOnePage.clickContinue();

    // 2. Revisão do pedido na etapa 2
    const itemsInOverview = await checkoutStepTwoPage.getItemNames();
    expect(itemsInOverview).toContain(PRODUCTS.BACKPACK);
    expect(itemsInOverview).toContain(PRODUCTS.FLEECE_JACKET);

    // 3. Finalização da compra
    await checkoutStepTwoPage.clickFinish();

    // 4. Validação da tela de sucesso
    const successMessage = await checkoutCompletePage.getCompleteHeaderMessage();
    expect(successMessage).toBe('Thank you for your order!');
  });

  test('Deve exibir erro ao tentar prosseguir sem preencher o primeiro nome', async ({ checkoutStepOnePage }) => {
    const randomUser = UserDataFactory.generateCheckoutUserInfo();
    await checkoutStepOnePage.fillInformation({
      lastName: randomUser.lastName,
      postalCode: randomUser.postalCode,
    });
    await checkoutStepOnePage.clickContinue();

    const errorMessage = await checkoutStepOnePage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.MISSING_FIRST_NAME);
  });

  test('Deve exibir erro ao tentar prosseguir sem preencher o sobrenome', async ({ checkoutStepOnePage }) => {
    const randomUser = UserDataFactory.generateCheckoutUserInfo();
    await checkoutStepOnePage.fillInformation({
      firstName: randomUser.firstName,
      postalCode: randomUser.postalCode,
    });
    await checkoutStepOnePage.clickContinue();

    const errorMessage = await checkoutStepOnePage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.MISSING_LAST_NAME);
  });

  test('Deve exibir erro ao tentar prosseguir sem preencher o código postal (CEP)', async ({ checkoutStepOnePage }) => {
    const randomUser = UserDataFactory.generateCheckoutUserInfo();
    await checkoutStepOnePage.fillInformation({
      firstName: randomUser.firstName,
      lastName: randomUser.lastName,
    });
    await checkoutStepOnePage.clickContinue();

    const errorMessage = await checkoutStepOnePage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.MISSING_POSTAL_CODE);
  });
});
