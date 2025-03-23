const { AllureRuntime } = require('allure-js-commons');
const { CucumberJSAllureFormatter } = require('allure-cucumberjs');
const fs = require('fs');
const path = require('path');
const cucumberPkg = require('@cucumber/cucumber/package.json');
const playwrightPkg = require('@playwright/test/package.json');

// Ensure allure-results directory exists
const allureResultsDir = path.join(process.cwd(), 'allure-results');
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}

// Create environment.properties file for Allure
const envProperties = `
BROWSER=chromium
ENVIRONMENT=${process.env.CI ? 'CI' : 'local'}
CUCUMBER_VERSION=${cucumberPkg.version}
PLAYWRIGHT_VERSION=${playwrightPkg.version}
NODE_VERSION=${process.version}
OS=${process.platform}
DATE=${new Date().toISOString()}
`;

fs.writeFileSync(
  path.join(allureResultsDir, 'environment.properties'),
  envProperties.trim()
);

// Create categories.json for Allure
const categories = [
  {
    name: 'Failed tests',
    matchedStatuses: ['failed']
  },
  {
    name: 'Broken tests',
    matchedStatuses: ['broken']
  },
  {
    name: 'Skipped tests',
    matchedStatuses: ['skipped']
  },
  {
    name: 'Passed tests',
    matchedStatuses: ['passed']
  }
];

fs.writeFileSync(
  path.join(allureResultsDir, 'categories.json'),
  JSON.stringify(categories, null, 2)
);

// Export the formatter for Cucumber.js
class AllureFormatter extends CucumberJSAllureFormatter {
  constructor(options) {
    const runtime = new AllureRuntime({ resultsDir: allureResultsDir });
    
    // Add a timestamp to ensure unique naming
    const timestamp = new Date().toISOString().replace(/[:\.]/g, '-');
    fs.writeFileSync(
      path.join(allureResultsDir, `formatter-${timestamp}.csv`),
      `Formatter initialized at ${timestamp}`
    );
    
    super(
      options,
      runtime,
      {
        labels: [
          { pattern: [/@epic:(.*)/], name: 'epic' },
          { pattern: [/@feature:(.*)/], name: 'feature' },
          { pattern: [/@story:(.*)/], name: 'story' },
          { pattern: [/@smoke/], name: 'tag', value: 'smoke' },
          { pattern: [/@form/], name: 'tag', value: 'form' },
          { pattern: [/@validation/], name: 'tag', value: 'validation' }
        ],
        // Add suite name for better organization
        setupAllureReporter: (reporter) => {
          reporter.setCurrentSuite('Playwright Cucumber Tests');
        }
      }
    );
    
    // Log the initialization
    console.log(`Allure formatter initialized with results directory: ${allureResultsDir}`);
  }
}

module.exports = AllureFormatter; 