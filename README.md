# Playwright Cucumber TypeScript Project

This project demonstrates behavior-driven testing using Playwright with Cucumber and TypeScript, including Page Object Pattern implementation, along with Allure reporting.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests with specific tags
```bash
# Run all tests with @smoke tag
npm run test:smoke

# Run debug tests
npm run test:debug

# Run tests with custom tags
npm test -- --tags "@todo and not @edit"
```

## Code Quality

### Linting

The project uses ESLint with TypeScript support for code quality.

```bash
# Run linting
npm run lint

# Fix linting issues automatically where possible
npm run lint:fix
```

## Allure Reporting

### Generate Allure report
```bash
npm run report:generate
```

### Open Allure report
```bash
npm run report:open
```

### Serve Allure report
```bash
npm run report:serve
```

## Project Structure

- `features/` - Contains all feature files (Gherkin syntax)
  - `todo.feature` - Todo app test scenarios
  - `failing.feature` - Intentionally failing tests for report demonstration
  - `formular.feature` - Form handling tests (pending)
  - `step_definitions/` - Contains all step implementations
  - `support/` - Contains hooks and custom world setup
- `pages/` - Contains Page Object Pattern implementation
  - `BasePage.ts` - Base page with common methods
  - `TodoPage.ts` - Todo app page object
  - `FormPage.ts` - Form handling page object
- `playwright.config.ts` - Playwright configuration
- `allure-results/` - Contains raw Allure report data
- `allure-report/` - Contains generated Allure reports
- `.eslintrc.js` - ESLint configuration

## Test Examples

The project includes examples of:
- Todo list interactions with Page Object Pattern
- Intentionally failing tests for report demonstration
- Tagging features and scenarios for selective test runs
- Custom world setup for Cucumber with Playwright
- Hooks for screenshot capture on test failures
- Allure reporting integration

## CI/CD

The project includes a GitHub Actions workflow for running tests in CI/CD environments. 