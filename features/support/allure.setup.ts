import { AllureRuntime } from 'allure-js-commons';
import { CucumberJSAllureFormatter } from 'allure-cucumberjs';
import * as fs from 'fs';
import * as path from 'path';
import * as cucumberPkg from '@cucumber/cucumber/package.json';
import * as playwrightPkg from '@playwright/test/package.json';

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
export default class AllureFormatter extends CucumberJSAllureFormatter {
  constructor(options: Record<string, unknown>) {
    super(
      options,
      new AllureRuntime({ resultsDir: allureResultsDir }),
      {
        labels: {
          epic: [/@epic:(.*)/],
          feature: [/@feature:(.*)/],
          story: [/@story:(.*)/]
        }
      }
    );
  }
} 