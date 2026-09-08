import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração principal do Playwright Test Framework.
 * Veja https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Tempo limite máximo para execução de um único teste (30 segundos) */
  timeout: 30 * 1000,
  expect: {
    /* Tempo limite para asserções do expect (5 segundos) */
    timeout: 5000,
  },
  /* Execução paralela dos testes */
  fullyParallel: true,
  /* Falhar o build no CI se houver test.only no código */
  forbidOnly: !!process.env.CI,
  /* Quantidade de tentativas em falhas (retries): 2 no CI, 0 localmente */
  retries: process.env.CI ? 2 : 0,
  /* Quantidade de workers paralelos */
  workers: process.env.CI ? 1 : undefined,
  /* Relatórios de execução: gera HTML e exibe no terminal */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  /* Configuração compartilhada para todos os testes */
  use: {
    /* URL base da aplicação sob teste (SauceDemo) */
    baseURL: 'https://www.saucedemo.com',

    /* Captura de Traces em caso de falha */
    trace: 'retain-on-failure',

    /* Captura de Screenshot apenas quando o teste falha */
    screenshot: 'only-on-failure',

    /* Gravador de Vídeo apenas quando o teste falha */
    video: 'retain-on-failure',

    /* Timeout para ações como click(), fill() (10 segundos) */
    actionTimeout: 10 * 1000,
  },

  /* Projetos para execução cross-browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
