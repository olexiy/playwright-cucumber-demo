# Playwright Cucumber TypeScript Project

This project demonstrates behavior-driven testing using Playwright with Cucumber and TypeScript, including Page Object Pattern implementation, along with Allure reporting.

## About This Project

This project showcases a modern end-to-end testing framework that combines several powerful tools:

- **Playwright**: Microsoft's browser automation library that enables reliable end-to-end testing for modern web apps
- **Cucumber**: BDD tool that lets you write tests in natural language (Gherkin syntax)
- **TypeScript**: Type-safe JavaScript that improves code quality and developer experience
- **Allure Reports**: Comprehensive test reporting tool with rich visualizations

The framework provides a robust foundation for implementing reliable, maintainable, and scalable automated test suites for web applications.

## Behavior-Driven Development (BDD)

This project follows BDD principles, which focus on:

- **Collaboration**: Business stakeholders, developers, and QA engineers work together to define behaviors
- **Scenarios**: Tests written in plain language that anyone can understand
- **Living Documentation**: Test scenarios serve as both specifications and executable tests

Benefits of BDD include:
- Improved communication between technical and non-technical team members
- Clear understanding of expected behavior before implementation
- Tests that directly map to user requirements and business value

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

Allure Reports provide comprehensive test result visualization with rich details including screenshots, steps, and timing data.

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
  - `todo.feature` - Todo app test scenarios (demo.playwright.dev)
  - `failing.feature` - Intentionally failing tests for report demonstration
  - `formular.feature` - Form handling tests using demoqa.com text-box page
  - `step_definitions/` - Contains all step implementations
  - `support/` - Contains hooks and custom world setup
- `pages/` - Contains Page Object Pattern implementation
  - `BasePage.ts` - Base page with common methods
  - `TodoPage.ts` - Todo app page object
  - `FormPage.ts` - TextBox form page object (demoqa.com)
- `playwright.config.ts` - Playwright configuration
- `allure-results/` - Contains raw Allure report data
- `allure-report/` - Contains generated Allure reports
- `.eslintrc.js` - ESLint configuration

## Test Examples

The project includes examples of:
- Todo list interactions with Page Object Pattern (demo.playwright.dev/todomvc)
- Form handling using DemoQA's text-box page (demoqa.com/text-box)
- Intentionally failing tests for report demonstration
- Tagging features and scenarios for selective test runs
- Custom world setup for Cucumber with Playwright
- Hooks for screenshot capture on test failures
- Allure reporting integration
- Multi-site testing with conditional baseURL configuration

## Key Technologies

### Playwright

Playwright is a modern browser automation library developed by Microsoft that enables:

- **Cross-browser testing**: Works with Chromium, Firefox, and WebKit
- **Auto-waiting**: Automatically waits for elements to be ready
- **Mobile emulation**: Tests mobile viewports
- **Network interception**: Mocks APIs and network requests
- **Powerful selectors**: Multiple selector strategies including CSS, XPath, and text

### Cucumber

Cucumber is a BDD tool that:

- Runs automated tests written in plain language
- Promotes collaboration between business and technical teams
- Enables writing features and scenarios in multiple languages
- Organizes tests by features and scenarios

### Page Object Pattern

This project implements the Page Object Pattern, which:

- Encapsulates page-specific selectors and actions
- Improves test maintainability
- Reduces code duplication
- Makes tests more readable
- Separates test logic from page interaction details

## CI/CD Integration

The project includes GitHub Actions workflow for continuous integration:

- **Automated test execution**: Tests run automatically on push and pull requests
- **Manual test execution**: Tests can be triggered manually with custom parameters
- **Cross-browser testing**: Tests run on multiple browser environments
- **Test reports**: Allure reports are generated and published to GitHub Pages
- **Failure notifications**: Alert the team when tests fail

### Setting Up GitHub Actions and GitHub Pages

To set up GitHub Actions and GitHub Pages for this project:

1. Navigate to the **Settings** tab in your GitHub repository
2. Select **Pages** from the left sidebar
3. Under **Source**, select the **gh-pages** branch
4. Click **Save**

After configuring GitHub Pages, your Allure reports will be automatically published at:
`https://[your-username].github.io/[repository-name]/`

### Manually Triggering Tests

You can manually trigger the test workflow:

1. Go to the **Actions** tab in your GitHub repository
2. Select **Playwright Cucumber Tests** workflow
3. Click **Run workflow**
4. Enter optional parameters:
   - Select a browser (chromium, firefox, webkit)
   - Specify tags to run specific tests (e.g., @smoke, @form)
5. Click **Run workflow**

### Viewing Allure Reports

After each workflow run, the Allure report is automatically published to GitHub Pages.

Access your latest test report at: **https://[your-username].github.io/[repository-name]/**

This link will always show the latest test results from your most recent workflow run.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 