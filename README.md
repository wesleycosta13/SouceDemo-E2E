# 🚀 Automação de Testes E2E - SauceDemo com Playwright & TypeScript

Projeto completo de automação de testes End-to-End (E2E) para a aplicação web [SauceDemo](https://www.saucedemo.com/), desenvolvido utilizando **Playwright**, **TypeScript**, a arquitetura **Page Object Model (POM)**, **Custom Fixtures**, dados dinâmicos com **Faker.js** e integração contínua no **GitHub Actions**.

---

## 📋 Conteúdo e Recursos do Projeto

- 🛠 **Playwright + TypeScript**: Configuração moderna com tipagem estática e alta performance.
- 📐 **Page Object Model (POM)**: Abstração das telas e componentes em classes reutilizáveis.
- 🧪 **Custom Fixtures**: Injeção automática das páginas nos testes, eliminando código repetitivo.
- 🎲 **Faker.js (`@faker-js/faker`)**: Geração dinâmica e realista de dados de comprador no checkout.
- 🚦 **Cenários Positivos e Negativos**:
  - **Login / Autenticação**: Sucesso, usuário bloqueado, senha incorreta e campos vazios.
  - **Produtos & Filtros**: Ordenação A-Z, Z-A, preço crescente e decrescente, inclusão e remoção.
  - **Carrinho de Compras**: Validação de itens, remoção interna e retorno ao catálogo.
  - **Checkout E2E**: Fluxo de compra completo e validações dos campos obrigatórios (Primeiro Nome, Sobrenome, CEP).
- 📊 **Relatórios de Execução**: Relatórios HTML interativos e no terminal.
- 📷 **Screenshots, Vídeos e Traces**: Captura automática somente em caso de falhas para depuração rápida.
- ⚙️ **GitHub Actions (CI)**: Pipeline configurada para execução automatizada em cada `push` e `pull_request`.

---

## 📁 Arquitetura e Estrutura de Pastas

```text
SouceDemo-E2E/
├── .github/
│   └── workflows/
│       └── playwright.yml        # Workflow do GitHub Actions (CI)
├── src/
│   ├── fixtures/
│   │   └── test.fixture.ts       # Custom Fixture estendendo o test do Playwright
│   ├── pages/
│   │   ├── BasePage.ts           # Classe base com utilitários e abstração da API
│   │   ├── LoginPage.ts          # Page Object da tela de Login
│   │   ├── ProductsPage.ts       # Page Object do catálogo de produtos e filtros
│   │   ├── CartPage.ts           # Page Object do Carrinho de compras
│   │   ├── CheckoutStepOnePage.ts# Page Object do Checkout etapa 1 (Dados do comprador)
│   │   ├── CheckoutStepTwoPage.ts# Page Object do Checkout etapa 2 (Resumo do pedido)
│   │   └── CheckoutCompletePage.ts# Page Object do Checkout etapa 3 (Sucesso)
│   └── utils/
│       ├── constants.ts          # Usuários de teste, mensagens de erro e opções de filtro
│       └── userData.factory.ts   # Fábrica de dados dinâmicos com Faker.js
├── tests/
│   ├── login.spec.ts             # Suíte de testes de Autenticação
│   ├── products.spec.ts          # Suíte de testes de Produtos e Filtros
│   ├── cart.spec.ts              # Suíte de testes de Carrinho
│   └── checkout.spec.ts          # Suíte de testes de Checkout E2E e validações
├── .gitignore
├── package.json
├── playwright.config.ts          # Configurações gerais do Playwright
├── tsconfig.json                 # Configurações do TypeScript
└── README.md                     # Documentação do projeto
```

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js**: Versão 18 ou superior ([Download Node.js](https://nodejs.org/))
- **npm** (incluso no Node.js)

---

## 🔧 Instalação e Configuração

1. Clone ou abra este repositório no seu computador:
   ```bash
   cd SouceDemo-E2E
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Instale os navegadores suportados pelo Playwright:
   ```bash
   npx playwright install
   ```

---

## 🏃 Executando os Testes

Você pode executar os testes utilizando os scripts npm pré-configurados no `package.json`:

| Comando | Descrição |
| :--- | :--- |
| `npm test` | Executa todos os testes E2E em modo headless (sem abrir navegador). |
| `npm run test:ui` | Abre a **Playwright UI**, permitindo executar e depurar testes visualmente. |
| `npm run test:headed` | Executa os testes abrindo a janela do navegador em tempo real. |
| `npm run test:debug` | Executa os testes no modo Playwright Inspector para depuração passo a passo. |
| `npm run report` | Abre o relatório interativo HTML com os detalhes da última execução. |

### Executando arquivos ou testes específicos:
```bash
# Executar apenas a suíte de Login
npx playwright test tests/login.spec.ts

# Executar apenas a suíte de Checkout
npx playwright test tests/checkout.spec.ts

# Executar apenas no navegador Chromium
npx playwright test --project=chromium
```

---

## 🔍 Screenshots, Vídeos e Traces em Falhas

No arquivo `playwright.config.ts`, o projeto está pré-configurado com as seguintes políticas de captura:
- **`screenshot: 'only-on-failure'`**: Tira foto da tela exata em que o teste falhar.
- **`trace: 'retain-on-failure'`**: Grava o Trace do Playwright em caso de falha (permitindo inspecionar DOM, rede e ações com o comando `npx playwright show-trace`).
- **`video: 'retain-on-failure'`**: Grava a gravação em vídeo apenas quando o teste falha.

---

## 🔄 Integração Contínua (CI) com GitHub Actions

O arquivo [playwright.yml](file:///.github/workflows/playwright.yml) garante que, a cada *push* ou *pull request* nos branches `main` ou `master`:
1. As dependências e navegadores sejam instalados no ambiente Linux do GitHub.
2. A suíte completa de testes seja executada.
3. O relatório HTML completo seja disponibilizado para download nos **Artefatos da Action**.

---

## 💡 Dicas de Boas Práticas Utilizadas

1. **Uso de Fixtures (`test.fixture.ts`)**: Em vez de declarar `new LoginPage(page)` no início de cada teste, os Page Objects são injetados diretamente na assinatura da função de teste (`({ loginPage, productsPage }) => ...`).
2. **Dados Dinâmicos com Faker.js (`userData.factory.ts`)**: Garantimos que cada execução de checkout utilize dados únicos (nome, sobrenome, CEP), reduzindo falsos positivos por dados duplicados.
3. **Assertividade Clientes e Resiliente**: O Playwright utiliza seletores `data-test` e mecanismo de auto-wait interno, tornando os testes extremamente rápidos e estáveis.
