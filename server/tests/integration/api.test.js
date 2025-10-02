const request = require('supertest');
const app = require('../../src/app');
const { Company, User, Product, Category, SubCategory, SubSubCategory } = require('../../src/models');
const { valid } = require('joi');

process.on('unhandledRejection', (reason, promise) => {
  console.log('🔴 UNHANDLED REJECTION:', reason);
  if (reason instanceof Error) {
    console.log('Stack:', reason.stack);
  }
});

describe('API Integration Tests', () => {
  let testUser;
  let testCategory;
  let testSubCategory;
  let testSubSubCategory;
  let authToken;

  beforeEach(async () => {
    await Company.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Test Company',
        email: 'company@example.com',
        phoneNo: '0000000000',
        location: 'Test Address',
      }
    });
    
    // Create test data
    testCategory = await Category.create({
      name: 'Electronics',
      description: 'Electronic products'
    });

    testSubCategory = await SubCategory.create({
      name: 'Mobiles',
      description: 'Mobile phones',
      CategoryId: testCategory.id
    });

    testSubSubCategory = await SubSubCategory.create({
      name: 'Smartphones',
      description: 'Smart mobile phones',
      SubCategoryId: testSubCategory.id
    });

    testUser = await User.create({
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      userType: 'Customer',
      variant: 'warning',
      priority: 2,
      CompanyId: 1,
      registerToken: null
    });
  });

  afterEach(async () => {
    // Clean up test data
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });
    await SubSubCategory.destroy({ where: {} });
    await SubCategory.destroy({ where: {} });
    await Category.destroy({ where: {} });
  });

  describe('Authentication Flow', () => {
    it('should complete full authentication flow', async () => {
      // 1. Register new user
      const registerData = {
        username: 'newuser',
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(registerData)
        .expect(200);

      expect(registerResponse.body).toHaveProperty('id');

      // 2. Check registration token
      const checkTokenResponse = await request(app)
        .post('/api/auth/checkRegsToken')
        .send({ email: 'newuser@example.com' })
        .expect(200);

      expect(checkTokenResponse.body.verificationStatus).toBe(false);

      // 3. Verify registration token
      const user = await User.findByPk(registerResponse.body.id);
      const verifyResponse = await request(app)
        .post('/api/auth/verifyRegsToken')
        .send({
          id: user.id,
          registerToken: user.registerToken
        })
        .expect(200);

      expect(verifyResponse.body).toHaveProperty('user');
      expect(verifyResponse.body).toHaveProperty('token');
      authToken = verifyResponse.body.token;
    });

    it('should handle password reset flow', async () => {
      // 1. Request password reset token
      const requestTokenResponse = await request(app)
        .post('/api/auth/requestPasswordToken')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(requestTokenResponse.body).toBeTruthy();

      // 2. Verify password reset token
      const user = await User.findOne({ where: { email: 'test@example.com' } });
      const response = await request(app)
        .get(`/api/auth/verifyPasswordToken/${user.resetPasswordToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');

      // 3. Reset password
      const newPassword = 'newpassword123';
      const resetPasswordResponse = await request(app)
        .post('/api/auth/resetPassword')
        .send({
          id: user.id,
          email: user.email,
          name: user.firstName,
          password: newPassword,
          resetToken: user.resetPasswordToken
        })
        .expect(200);

      expect(resetPasswordResponse.body.id).toBe(user.id);
    });
  });

  describe('Product Management Flow', () => {
    let createdProductId;

    it('should complete full product management flow', async () => {
      // 1. Get all products
      const getAllResponse = await request(app)
        .get('/api/products/getAllProducts')
        .expect(200);

      expect(getAllResponse.body).toBeInstanceOf(Array);

      // 2. Create new product
      const productData = {
        title: 'Integration Test Product',
        description: 'A product created during integration test',
        amount: 299.99,
        currency: 'USD',
        rating: 4.0,
        sales: 0,
        CategoryId: testCategory.id,
        SubCategoryId: testSubCategory.id,
        SubSubCategoryId: testSubSubCategory.id
      };

      const createResponse = await request(app)
        .post('/api/products/createProduct')
        .send(productData)
        .expect(200);

      expect(createResponse.body).toHaveProperty('id');
      createdProductId = createResponse.body.id;

      // 3. Get specific product
      const getProductResponse = await request(app)
        .get(`/api/products/getProduct/${createdProductId}`)
        .expect(200);

      expect(getProductResponse.body.title).toBe(productData.title);

      // 4. Update product
      const updateData = {
        id: createdProductId,
        title: 'Updated Integration Test Product',
        amount: 399.99
      };

      const updateResponse = await request(app)
        .put('/api/products/updateProduct')
        .send(updateData)
        .expect(200);

      expect(updateResponse.body.title).toBe(updateData.title);

      // 5. Get product sales
      const getSalesResponse = await request(app)
        .get(`/api/products/getProductSales/${createdProductId}`)
        .expect(200);

      expect(getSalesResponse.body).toHaveProperty('sales');

      // 6. Get product rating
      const getRatingResponse = await request(app)
        .get(`/api/products/getProductRating/${createdProductId}`)
        .expect(200);

      expect(getRatingResponse.body).toHaveProperty('rating');

      // 7. Get top selling products
      const topSellResponse = await request(app)
        .get('/api/products/topSellProduct/5')
        .expect(200);

      expect(topSellResponse.body).toBeInstanceOf(Array);

      // 8. Get new products
      const newProductsResponse = await request(app)
        .get('/api/products/newAddProduct/5')
        .expect(200);

      expect(newProductsResponse.body).toBeInstanceOf(Array);

      // 9. Get recommendations
      const recommendationsResponse = await request(app)
        .get(`/api/products/getRecommendation/${testSubSubCategory.id}/5`)
        .expect(200);

      expect(recommendationsResponse.body).toBeInstanceOf(Array);

      // 10. Delete product
      const deleteResponse = await request(app)
        .delete(`/api/products/deleteProduct/${createdProductId}`)
        .expect(200);

      expect(deleteResponse.body.id).toBe(createdProductId);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid routes gracefully', async () => {
      const response = await request(app)
        .get('/api/invalid/route')
        .expect(404);
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/products/createProduct')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });

    it('should handle missing required fields', async () => {
      const response = await request(app)
        .post('/api/products/createProduct')
        .send({}) // Empty body
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Data Consistency', () => {
    it('should maintain referential integrity', async () => {
      // Create a product with valid foreign keys
      const product = await Product.create({
        title: 'Consistency Test Product',
        description: 'Testing data consistency',
        amount: 199.99,
        currency: 'USD',
        rating: 4.0,
        sales: 0,
        CategoryId: testCategory.id,
        SubCategoryId: testSubCategory.id,
        SubSubCategoryId: testSubSubCategory.id
      });

      // Verify the product was created with correct relationships
      const createdProduct = await Product.findByPk(product.id, {
        include: [Category, SubCategory, SubSubCategory]
      });

      expect(createdProduct.Category.id).toBe(testCategory.id);
      expect(createdProduct.SubCategory.id).toBe(testSubCategory.id);
      expect(createdProduct.SubSubCategory.id).toBe(testSubSubCategory.id);

      // Clean up
      await product.destroy();
    });
  });
});
