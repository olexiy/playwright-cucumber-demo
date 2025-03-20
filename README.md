# Playwright TypeScript Project

This project demonstrates end-to-end testing using Playwright with TypeScript, including both UI and API testing capabilities, along with Allure reporting.

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

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
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

- `tests/` - Contains all test files
  - `demo.spec.ts` - Demo tests including UI and API examples
- `playwright.config.ts` - Playwright configuration
- `allure-results/` - Contains raw Allure report data
- `allure-report/` - Contains generated Allure reports

## Test Examples

The project includes examples of:
- UI testing using the Playwright demo site
- API testing using JSONPlaceholder
- Form handling
- Todo list interactions
- Allure reporting integration

## CI/CD

The project includes a GitHub Actions workflow for running tests in CI/CD environments. 