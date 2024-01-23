# 🎭 Playwright Project - Huy Nguyen 48255

## Installation

###  Install application and environment
* [Install nodejs](https://nodejs.org/en/download)
* [Install Test Architect](https://www.testarchitect.com/)
* [Install Visual Studio Code](https://code.visualstudio.com/Download)

###  Clone project
```Shell
# Clone project
git clone https://github.com/nguyenbinv/playwright_huynguyen_8255.git
```

## VSCode plugins
* [Install Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Using the project

### Modify playwright.config.ts file
* Modify "baseURL" variable to adapt with your locallhost/ip PC
* Modify "projects" to choose which browser want to run
* Modify "fullyParallel: false/true" to run parallel or not

### Run the test
```Shell
# Run the test
npx playwright test

# Show the report
npx playwright show-report
```

## Resources

* [Documentation](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)
