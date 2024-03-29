# Playwright API Test Automation Demo

This project serves as a boilerplate for automating REST APIs across various environments using Playwright.

[![Playwright API Test Automation Demo](https://github.com/osandadeshan/playwright-api-automation-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/osandadeshan/playwright-api-automation-demo/actions/workflows/playwright.yml)

## Introduction
Playwright, a versatile end-to-end testing library developed by Microsoft, offers comprehensive support for automating API testing alongside its renowned capabilities for browser automation. With Playwright's intuitive API and powerful features, developers and QA engineers can seamlessly automate the validation of API endpoints, ensuring the correctness and reliability of backend services. Leveraging Playwright's robust toolset, teams can effortlessly send HTTP requests, inspect responses, and verify data integrity, facilitating thorough testing of RESTful APIs and GraphQL endpoints alike. Whether validating CRUD operations, handling authentication mechanisms, or testing edge cases, Playwright empowers teams to craft and execute intricate API test scenarios with ease. By integrating API testing into the broader automated testing strategy facilitated by Playwright, organizations can enhance the quality, performance, and security of their software solutions, ultimately delivering superior experiences to end-users.

Explore Playwright API Testing Documentation [here.](https://playwright.dev/docs/api-testing)

## Installation
To set up this project, you can use the following command:

```bash
npm ci
```

## Handling Multiple Test Environments
### Overview
When working on a project with multiple test environments such as development (dev), system integration testing (sit), and user acceptance testing (uat), managing configurations across these environments becomes crucial. The playwright.config.ts file in this project provides support for handling these multiple test environments efficiently.

### Configuration
The configuration is defined using TypeScript interfaces and objects, allowing for easy management and customization based on the specific requirements of each environment.

Look at: [playwright.config.ts](./playwright.config.ts)

### Usage
- **Environment-Specific URLs:** Each environment (dev, sit, uat) has its own set of authentication API URL and base API URL. These URLs are defined in the respective configuration objects (`devConfig`, `sitConfig`, `uatConfig`).
- **Test Data Directory:** Environment-specific test data can be found in the `/src/test/resources/` directory, organized under separate subdirectories for each environment.

### Customization
To add or modify configurations for additional environments, simply create a new configuration object following the same structure as `devConfig`, `sitConfig`, and `uatConfig`. Update the `config` object based on the desired environment selected during test execution.

### Execute Tests
To run your automated API tests aginst Dev environment, use the following command:

```bash
npm run test-dev
```

To run your automated API tests aginst SIT environment, use the following command:

```bash
npm run test-sit
```

To run your automated API tests aginst UAT environment, use the following command:

```bash
npm run test-uat
```
### Benefits
- **Modular and Scalable:** The configuration setup allows for easy addition of new environments and modifications to existing configurations as the project evolves.
- **Consistency:** Each environment has its own dedicated set of configurations, ensuring consistency and reliability across different testing stages.
- **Flexibility:** Testers can seamlessly switch between environments without altering test scripts, improving productivity and efficiency during testing cycles.
