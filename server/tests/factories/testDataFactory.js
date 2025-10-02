// Test data factory for creating consistent test data

const createUser = (overrides = {}) => ({
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'password123',
  userType: 'Customer',
  variant: 'warning',
  priority: 2,
  CompanyId: 1,
  profileImage: 'http://localhost:8081/public/user-image/default-man.png',
  ...overrides
});

const createAdminUser = (overrides = {}) => createUser({
  username: 'adminuser',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  userType: 'Admin',
  variant: 'dark',
  priority: 1,
  ...overrides
});

const createCategory = (overrides = {}) => ({
  name: 'Electronics',
  description: 'Electronic products',
  ...overrides
});

const createSubCategory = (categoryId, overrides = {}) => ({
  name: 'Mobiles',
  description: 'Mobile phones',
  CategoryId: categoryId,
  ...overrides
});

const createSubSubCategory = (subCategoryId, overrides = {}) => ({
  name: 'Smartphones',
  description: 'Smart mobile phones',
  SubCategoryId: subCategoryId,
  ...overrides
});

const createProduct = (categoryId, subCategoryId, subSubCategoryId, overrides = {}) => ({
  title: 'Test Product',
  description: 'A test product for testing',
  amount: 99.99,
  currency: 'USD',
  rating: 4.5,
  sales: 0,
  image1: 'test-image.jpg',
  CategoryId: categoryId,
  SubCategoryId: subCategoryId,
  SubSubCategoryId: subSubCategoryId,
  ...overrides
});

const createOrder = (userId, overrides = {}) => ({
  UserId: userId,
  totalAmount: 199.98,
  status: 'pending',
  shippingAddress: '123 Test St, Test City, TC 12345',
  ...overrides
});

const createOrderItem = (orderId, productId, overrides = {}) => ({
  OrderId: orderId,
  ProductId: productId,
  quantity: 1,
  price: 99.99,
  ...overrides
});

const createReview = (userId, productId, overrides = {}) => ({
  UserId: userId,
  ProductId: productId,
  rating: 5,
  comment: 'Great product!',
  ...overrides
});

const createWishlist = (userId, productId, overrides = {}) => ({
  UserId: userId,
  ProductId: productId,
  ...overrides
});

// API request data factories
const createLoginRequest = (overrides = {}) => ({
  email: 'test@example.com',
  password: 'password123',
  ...overrides
});

const createRegisterRequest = (overrides = {}) => ({
  username: 'newuser',
  firstName: 'New',
  lastName: 'User',
  email: 'newuser@example.com',
  password: 'password123',
  userType: 'Customer',
  ...overrides
});

const createProductRequest = (overrides = {}) => ({
  title: 'New Product',
  description: 'A new product',
  amount: 149.99,
  currency: 'USD',
  rating: 4.0,
  sales: 0,
  CategoryId: 1,
  SubCategoryId: 1,
  SubSubCategoryId: 1,
  ...overrides
});

// Mock response data
const createApiResponse = (data, status = 200) => ({
  status,
  data,
  statusText: status === 200 ? 'OK' : 'Error'
});

const createErrorResponse = (message, status = 500) => ({
  status,
  data: { error: message },
  statusText: 'Error'
});

module.exports = {
  createUser,
  createAdminUser,
  createCategory,
  createSubCategory,
  createSubSubCategory,
  createProduct,
  createOrder,
  createOrderItem,
  createReview,
  createWishlist,
  createLoginRequest,
  createRegisterRequest,
  createProductRequest,
  createApiResponse,
  createErrorResponse
};
