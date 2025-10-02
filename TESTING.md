# Testing Guide for Emarket

This document provides comprehensive information about the testing setup and how to run tests for both the Node.js server and Vue.js shop frontend.

## Overview

The Emarket project includes a complete testing suite with:

- **Unit Tests** for server controllers and Vue components
- **Integration Tests** for API endpoints
- **Service Tests** for Vue services
- **Store Tests** for Vuex modules
- **End-to-End Tests** for user flows

## Port Configuration

The application uses the following ports:

- **Server (Node.js)**: Port 8081 - API endpoints and backend services
- **Shop (Vue.js)**: Port 8080 - Frontend application
- **Playwright E2E Tests**: Tests against <http://localhost:8080> (shop frontend)

Make sure both the server and shop are running before executing end-to-end tests.

### Starting Applications for Testing

Before running end-to-end tests, you need to start both applications:

```bash
# Terminal 1 - Start the server (port 8081)
cd server
npm start

# Terminal 2 - Start the shop (port 8080)
cd shop
npm run serve
```

The test runner will automatically check if both applications are running before executing e2e tests.

## Test Structure

```txt
Emarket/
├── server/
│   ├── tests/
│   │   ├── controllers/          # Unit tests for controllers
│   │   ├── integration/          # Integration tests for APIs
│   │   └── setup.js             # Test setup configuration
│   ├── jest.config.js           # Jest configuration for server
│   └── package.json             # Server dependencies
├── shop/
│   ├── tests/
│   │   ├── components/          # Vue component tests
│   │   ├── services/            # Service tests
│   │   ├── store/               # Vuex store tests
│   │   ├── e2e/                 # End-to-end tests
│   │   └── setup.js             # Test setup configuration
│   ├── jest.config.js           # Jest configuration for shop
│   ├── playwright.config.ts     # Playwright configuration
│   └── package.json             # Shop dependencies
└── run-tests.sh                 # Test runner script
```

## Quick Start

### Run All Tests

```bash
./run-tests.sh
```

### Run Specific Test Suites

```bash
# Server tests only
./run-tests.sh --server-only

# Shop tests only
./run-tests.sh --shop-only

# Skip e2e tests
./run-tests.sh --no-e2e

# With coverage reports
./run-tests.sh --coverage

# Watch mode for development
./run-tests.sh --watch
```

## Server Testing

### Setup

The server uses Jest for testing with the following configuration:

- **Test Environment**: Node.js
- **Coverage Threshold**: 70% for all metrics
- **Test Timeout**: 10 seconds
- **Database**: In-memory SQLite for tests

### Running Server Tests

```bash
cd server
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
```

### Test Categories

#### 1. Controller Tests (`tests/controllers/`)

- **ProductsController.test.js**: Tests for product CRUD operations
- **AuthenticationController.test.js**: Tests for user authentication flows

#### 2. Integration Tests (`tests/integration/`)

- **api.test.js**: Full API workflow tests including authentication and product management

### Key Features Tested

- ✅ Product CRUD operations
- ✅ User registration and login
- ✅ Password reset flow
- ✅ Email verification
- ✅ Error handling
- ✅ Data validation
- ✅ Authentication middleware

## Shop Testing

### Setup

The shop uses Jest and Vue Test Utils for unit testing, and Playwright for e2e testing:

- **Unit Test Framework**: Jest + Vue Test Utils
- **E2E Framework**: Playwright
- **Coverage Threshold**: 70% for all metrics
- **Mocking**: Axios for API calls

### Running Shop Tests

```bash
cd shop
npm run test:unit          # Unit tests
npm run test:e2e           # E2E tests
```

### Test Categories

#### 1. Component Tests (`tests/components/`)

- **TopHeader.test.js**: Navigation and user interface tests
- **ProductList.test.js**: Product display and interaction tests

#### 2. Service Tests (`tests/services/`)

- **Api.test.js**: API service configuration tests
- **AuthenticationService.test.js**: Authentication service tests
- **ProductsService.test.js**: Product service tests

#### 3. Store Tests (`tests/store/`)

- **CurrentUser.test.js**: User state management tests
- **Products.test.js**: Product state management tests

#### 4. E2E Tests (`tests/e2e/`)

- **user-flow.spec.js**: Complete user journey tests

### Key Features Tested

- ✅ Vue component rendering and behavior
- ✅ Vuex store mutations and actions
- ✅ Service API calls and error handling
- ✅ User authentication flows
- ✅ Product browsing and interaction
- ✅ Responsive design
- ✅ Error handling and edge cases

## Test Configuration

### Jest Configuration (Server)

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

### Jest Configuration (Shop)

```javascript
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

### Playwright Configuration

```typescript
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  retries: 2,
  use: {
    headless: true,
    baseURL: 'http://localhost:8080',
  },
});
```

## Coverage Reports

Coverage reports are generated in HTML format and can be viewed by opening:

- **Server**: `server/coverage/lcov-report/index.html`
- **Shop**: `shop/coverage/lcov-report/index.html`

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: ./run-tests.sh --coverage
```

## Best Practices

### Writing Tests

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Descriptive Names**: Use clear, descriptive test names
3. **Single Responsibility**: One test per behavior
4. **Mock External Dependencies**: Use mocks for API calls and external services
5. **Test Edge Cases**: Include error conditions and boundary cases

### Test Data

- Use factories for creating test data
- Clean up test data after each test
- Use meaningful test data that reflects real usage

### Performance

- Keep unit tests fast (< 100ms each)
- Use parallel execution where possible
- Mock heavy operations in unit tests

## Troubleshooting

### Common Issues

#### Server Tests

- **Database Connection**: Ensure test database is properly configured
- **Environment Variables**: Set up test environment variables
- **Port Conflicts**: Use different ports for test and development

#### Shop Tests

- **Vue Test Utils**: Ensure proper component mounting
- **Mocking**: Check that all external dependencies are mocked
- **Async Operations**: Use proper async/await patterns

#### E2E Tests

- **Application Running**: Ensure the application is running before e2e tests
- **Browser Installation**: Run `npx playwright install` if needed
- **Timeouts**: Increase timeout for slow operations

### Debug Mode

```bash
# Debug server tests
cd server
npm test -- --verbose

# Debug shop tests
cd shop
npm run test:unit -- --verbose

# Debug e2e tests
cd shop
npx playwright test --debug
```

## Test Maintenance

### Regular Tasks

1. **Update Dependencies**: Keep testing frameworks updated
2. **Review Coverage**: Ensure coverage thresholds are met
3. **Refactor Tests**: Keep tests maintainable and readable
4. **Add New Tests**: Add tests for new features
5. **Remove Obsolete Tests**: Clean up tests for removed features

### Monitoring

- Set up CI/CD to run tests on every commit
- Monitor test execution time
- Track coverage trends over time
- Review and update test data regularly

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain or improve coverage
4. Update documentation if needed

## Support

For testing-related issues:

1. Check this documentation
2. Review test logs and error messages
3. Check configuration files
4. Verify dependencies are installed
5. Ensure proper environment setup
