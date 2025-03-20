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
ENVIRONMENT=local
CUCUMBER_VERSION=${cucumberPkg.version}
PLAYWRIGHT_VERSION=${playwrightPkg.version}
NODE_VERSION=${process.version}
OS=${process.platform}
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
    super(
      options,
      runtime,
      {
        labels: [
          { pattern: [/@epic:(.*)/], name: 'epic' },
          { pattern: [/@feature:(.*)/], name: 'feature' },
          { pattern: [/@story:(.*)/], name: 'story' }
        ]
      }
    );
  }
}

module.exports = AllureFormatter; 