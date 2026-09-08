import { test, expect } from '../src/fixtures/test.fixture';
import { TEST_USERS, PASSWORD, INVALID_PASSWORD, ERROR_MESSAGES } from '../src/utils/constants';

test.describe('Autenticação e Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Deve realizar login com sucesso informando credenciais válidas', async ({ loginPage, productsPage }) => {
    await loginPage.login(TEST_USERS.STANDARD, PASSWORD);
    
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(await productsPage.getCurrentUrl()).toContain('/inventory.html');
  });

  test('Deve exibir mensagem de erro ao tentar logar com usuário bloqueado', async ({ loginPage }) => {
    await loginPage.login(TEST_USERS.LOCKED_OUT, PASSWORD);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.LOCKED_OUT_USER);
  });

  test('Deve exibir mensagem de erro ao informar senha incorreta', async ({ loginPage }) => {
    await loginPage.login(TEST_USERS.STANDARD, INVALID_PASSWORD);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test('Deve exibir mensagem de erro ao tentar logar sem preencher o nome de usuário', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.EMPTY_USERNAME);
  });

  test('Deve exibir mensagem de erro ao tentar logar sem preencher a senha', async ({ loginPage }) => {
    await loginPage.login(TEST_USERS.STANDARD, '');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ERROR_MESSAGES.EMPTY_PASSWORD);
  });
});
