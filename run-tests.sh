#!/bin/bash

# Test runner script for Emarket project
# This script runs all tests for both server and shop

set -e

echo "🚀 Starting Emarket Test Suite"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "server" ] && [ ! -d "shop" ]; then
    print_error "Please run this script from the Emarket project root directory"
    exit 1
fi

# Parse command line arguments
RUN_SERVER_TESTS=true
RUN_SHOP_TESTS=true
RUN_E2E_TESTS=true
COVERAGE=false
WATCH=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --server-only)
            RUN_SERVER_TESTS=true
            RUN_SHOP_TESTS=false
            RUN_E2E_TESTS=false
            shift
            ;;
        --shop-only)
            RUN_SERVER_TESTS=false
            RUN_SHOP_TESTS=true
            RUN_E2E_TESTS=false
            shift
            ;;
        --no-e2e)
            RUN_E2E_TESTS=false
            shift
            ;;
        --coverage)
            COVERAGE=true
            shift
            ;;
        --watch)
            WATCH=true
            shift
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --server-only    Run only server tests"
            echo "  --shop-only      Run only shop tests"
            echo "  --no-e2e         Skip end-to-end tests"
            echo "  --coverage       Generate coverage reports"
            echo "  --watch          Run tests in watch mode"
            echo "  --help           Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Function to run server tests
run_server_tests() {
    print_status "Running Server Tests..."
    echo "================================"
    
    cd server
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing server dependencies..."
        npm install
    fi
    
    # Run tests
    if [ "$COVERAGE" = true ]; then
        print_status "Running server tests with coverage..."
        npm run test:coverage
    elif [ "$WATCH" = true ]; then
        print_status "Running server tests in watch mode..."
        npm run test:watch
    else
        print_status "Running server tests..."
        npm test
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Server tests passed! ✅"
    else
        print_error "Server tests failed! ❌"
        exit 1
    fi
    
    cd ..
}

# Function to run shop tests
run_shop_tests() {
    print_status "Running Shop Tests..."
    echo "================================"
    
    cd shop
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing shop dependencies..."
        npm install
    fi
    
    # Run unit tests
    if [ "$COVERAGE" = true ]; then
        print_status "Running shop unit tests with coverage..."
        npm run test:unit
    else
        print_status "Running shop unit tests..."
        npm run test:unit
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Shop unit tests passed! ✅"
    else
        print_error "Shop unit tests failed! ❌"
        exit 1
    fi
    
    cd ..
}

# Function to run e2e tests
run_e2e_tests() {
    print_status "Running End-to-End Tests..."
    echo "================================"
    
    # Check if applications are running
    print_status "Checking if applications are running..."
    if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
        print_warning "Shop application (port 8080) is not running!"
        print_warning "Please start the shop with: cd shop && npm run serve"
        return 1
    fi
    
    if ! curl -s http://localhost:8081 > /dev/null 2>&1; then
        print_warning "Server application (port 8081) is not running!"
        print_warning "Please start the server with: cd server && npm start"
        return 1
    fi
    
    cd shop
    
    # Check if Playwright is installed
    if ! npx playwright --version > /dev/null 2>&1; then
        print_status "Installing Playwright..."
        npx playwright install
    fi
    
    # Run e2e tests
    print_status "Running e2e tests against http://localhost:8080..."
    npm run test:e2e
    
    if [ $? -eq 0 ]; then
        print_success "E2E tests passed! ✅"
    else
        print_warning "E2E tests failed! ⚠️"
        print_warning "Note: E2E tests require both server (8081) and shop (8080) to be running"
    fi
    
    cd ..
}

# Main execution
echo ""
print_status "Test Configuration:"
echo "  Server Tests: $RUN_SERVER_TESTS"
echo "  Shop Tests: $RUN_SHOP_TESTS"
echo "  E2E Tests: $RUN_E2E_TESTS"
echo "  Coverage: $COVERAGE"
echo "  Watch Mode: $WATCH"
echo ""

# Run server tests
if [ "$RUN_SERVER_TESTS" = true ]; then
    run_server_tests
    echo ""
fi

# Run shop tests
if [ "$RUN_SHOP_TESTS" = true ]; then
    run_shop_tests
    echo ""
fi

# Run e2e tests
if [ "$RUN_E2E_TESTS" = true ]; then
    run_e2e_tests
    echo ""
fi

# Final summary
echo "================================"
print_success "All tests completed! 🎉"

if [ "$COVERAGE" = true ]; then
    print_status "Coverage reports generated in:"
    echo "  Server: server/coverage/"
    echo "  Shop: shop/coverage/"
fi

echo ""
print_status "Test Summary:"
echo "  ✅ Server tests: $([ "$RUN_SERVER_TESTS" = true ] && echo "PASSED" || echo "SKIPPED")"
echo "  ✅ Shop tests: $([ "$RUN_SHOP_TESTS" = true ] && echo "PASSED" || echo "SKIPPED")"
echo "  ✅ E2E tests: $([ "$RUN_E2E_TESTS" = true ] && echo "PASSED" || echo "SKIPPED")"
