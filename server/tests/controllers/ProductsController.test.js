const request = require('supertest');
const app = require('../../src/app');
const { Product, Category, SubCategory, SubSubCategory } = require('../../src/models');
describe('ProductsController', () => {
  let testProduct;
  let testCategory;
  let testSubCategory;
  let testSubSubCategory;

  beforeEach(async () => {
 
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

    testProduct = await Product.create({
      title: 'Test iPhone',
      description: 'A test iPhone',
      amount: 999.99,
      currency: 'USD',
      rating: 4.5,
      sales: 100,
      image1: 'test-image.jpg',
      CategoryId: testCategory.id,
      SubCategoryId: testSubCategory.id,
      SubSubCategoryId: testSubSubCategory.id
    });
  });

  afterEach(async () => {
    // Clean up test data
    // await Product.destroy({ where: {} });
    // await SubSubCategory.destroy({ where: {} });
    // await SubCategory.destroy({ where: {} });
    // await Category.destroy({ where: {} });
  });

  describe('GET /api/products/getAllProducts', () => {
    it('should return all products with categories', async () => {
      const response = await request(app)
        .get('/api/products/getAllProducts')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('Category');
      expect(response.body[0]).toHaveProperty('SubCategory');
      expect(response.body[0]).toHaveProperty('SubSubCategory');
    });

    it('should return products ordered by createdAt DESC', async () => {
      const response = await request(app)
        .get('/api/products/getAllProducts')
        .expect(200);

      expect(response.body[0].id).toBe(testProduct.id);
    });
  });

  describe('GET /api/products/topSellProduct/:limit', () => {
    it('should return top selling products', async () => {
      const response = await request(app)
        .get('/api/products/topSellProduct/5')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeLessThanOrEqual(5);
      expect(response.body[0]).toHaveProperty('sales');
    });

    it('should return products ordered by sales DESC', async () => {
      // Create another product with higher sales
      const highSalesProduct = await Product.create({
        title: 'High Sales Product',
        description: 'A product with high sales',
        amount: 199.99,
        currency: 'USD',
        rating: 4.0,
        sales: 200,
        image1: 'high-sales.jpg',
        CategoryId: testCategory.id,
        SubCategoryId: testSubCategory.id,
        SubSubCategoryId: testSubSubCategory.id
      });

      const response = await request(app)
        .get('/api/products/topSellProduct/5')
        .expect(200);

      expect(response.body[0].sales).toBeGreaterThanOrEqual(response.body[1].sales);
    });
  });

  describe('GET /api/products/newAddProduct/:limit', () => {
    it('should return recently added products', async () => {
      const response = await request(app)
        .get('/api/products/newAddProduct/5')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /api/products/getRecommendation/:subSubCategoryId/:limit', () => {
    it('should return recommended products for sub-sub-category', async () => {
      const response = await request(app)
        .get(`/api/products/getRecommendation/${testSubSubCategory.id}/5`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /api/products/getProduct/:productId', () => {
    it('should return a specific product', async () => {
      const response = await request(app)
        .get(`/api/products/getProduct/${testProduct.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', testProduct.id);
      expect(response.body).toHaveProperty('title', testProduct.title);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/getProduct/99999')
        .expect(404);
    
      expect(response.body).toHaveProperty('error', 'Product not found.');
    });    
  });

  describe('GET /api/products/getProductSales/:productId', () => {
    it('should return product sales data', async () => {
      const response = await request(app)
        .get(`/api/products/getProductSales/${testProduct.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('sales', testProduct.sales);
    });
  });

  describe('GET /api/products/getProductRating/:productId', () => {
    it('should return product rating data', async () => {
      const response = await request(app)
        .get(`/api/products/getProductRating/${testProduct.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('rating', testProduct.rating);
      expect(response.body).toHaveProperty('peopleRated');
    });
  });

  describe('POST /api/products/createProduct', () => {
    it('should create a new product', async () => {
      const newProduct = {
        title: 'New Test Product',
        description: 'A new test product',
        amount: 299.99,
        currency: 'USD',
        rating: 4.0,
        sales: 50,
        CategoryId: testCategory.id,
        SubCategoryId: testSubCategory.id,
        SubSubCategoryId: testSubSubCategory.id
      };

      const response = await request(app)
        .post('/api/products/createProduct')
        .send(newProduct)
        .expect(200);

      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/products/updateProduct', () => {
    it('should update an existing product', async () => {
      const updatedData = {
        id: testProduct.id,
        title: 'Updated Test Product',
        amount: 899.99
      };

      const response = await request(app)
        .put('/api/products/updateProduct')
        .send(updatedData)
        .expect(200);

      expect(response.body).toHaveProperty('title', updatedData.title);
    });
  });

  describe('DELETE /api/products/deleteProduct/:productId', () => {
    it('should delete an existing product', async () => {
      const response = await request(app)
        .delete(`/api/products/deleteProduct/${testProduct.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', testProduct.id);
    });

    it('should return 403 for non-existent product', async () => {
      const response = await request(app)
        .delete('/api/products/deleteProduct/99999')
        .expect(403);

      expect(response.body).toHaveProperty('error', 'No product to delete.');
    });
  });
});
