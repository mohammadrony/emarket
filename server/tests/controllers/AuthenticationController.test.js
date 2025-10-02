const request = require('supertest');
const app = require('../../src/app');
const { Company, User } = require('../../src/models');

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn((mailOptions, callback) => {
      callback(null, { messageId: 'test-message-id' });
    })
  }))
}));


describe('AuthenticationController', () => {
  
  beforeEach(async () => {
    await User.destroy({ where: {} });
    await Company.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        name: 'Test Company',
        email: 'company@example.com',
        phoneNo: '0000000000',
        location: 'Test Address',
      },
    });
  });

  afterEach(async () => {
    // Clean up users table
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new customer user', async () => {
      const userData = {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      
      // Verify user was created in database
      const user = await User.findByPk(response.body.id);
      expect(user).toBeTruthy();
      expect(user.email).toBe(userData.email);
      expect(user.registerToken).toBeTruthy();
    });

    it('should return 400 for duplicate email', async () => {
      const userData = {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      };

      // Create first user
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(200);

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'This account is already in use.');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a verified user for login tests
      await User.create({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1,
        registerToken: null // User is verified
      });
    });

    it('should login with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(loginData.email);
    });

    it('should return 403 for incorrect email', async () => {
      const loginData = {
        email: 'wrong@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(403);

      expect(response.body).toHaveProperty('error', 'Incorrect login information.');
    });

    it('should return 403 for incorrect password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(403);

      expect(response.body).toHaveProperty('error', 'Incorrect login information.');
    });

    it('should return 403 for unverified user', async () => {
      // Create unverified user
      await User.create({
        username: 'unverified',
        firstName: 'Unverified',
        lastName: 'User',
        email: 'unverified@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1,
        registerToken: 'verification-token'
      });

      const loginData = {
        email: 'unverified@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(403);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('verify your email');
    });
  });

  describe('POST /api/auth/requestPasswordToken', () => {
    beforeEach(async () => {
      await User.create({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1
      });
    });

    it('should send password reset token', async () => {
      const response = await request(app)
        .post('/api/auth/requestPasswordToken')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(response.body).toBeTruthy();
    });

    it('should return 403 for non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/requestPasswordToken')
        .send({ email: 'nonexistent@example.com' })
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/auth/verifyPasswordToken/:token', () => {
    it('should verify password reset token', async () => {
      const user = await User.create({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1,
        resetPasswordToken: 'valid-token'
      });

      const response = await request(app)
        .get('/api/auth/verifyPasswordToken/valid-token')
        .expect(200);

      expect(response.body).toHaveProperty('user');
    });

    it('should return 403 for invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/verifyPasswordToken/invalid-token')
        .expect(403);

      expect(response.body).toHaveProperty('error', 'invalid token.');
    });
  });

  describe('POST /api/auth/checkRegsToken', () => {
    it('should check registration token for verified user', async () => {
      await User.create({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1,
        registerToken: null // User is verified
      });

      const response = await request(app)
        .post('/api/auth/checkRegsToken')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(response.body).toHaveProperty('verificationStatus', true);
    });

    it('should check registration token for unverified user', async () => {
      await User.create({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'Customer',
        variant: 'warning',
        priority: 2,
        CompanyId: 1,
        registerToken: 'verification-token'
      });

      const response = await request(app)
        .post('/api/auth/checkRegsToken')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(response.body).toHaveProperty('verificationStatus', false);
    });
  });
});
