const { sequelize, User, Product, Category, SubCategory, SubSubCategory } = require('../src/models');

beforeAll(async () => {
  console.time('setup');
  await sequelize.sync({ force: true });
  console.timeEnd('setup');

  // Mock console to reduce test noise
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'info').mockImplementation(() => {});
  jest.spyOn(console, 'debug').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

beforeEach(async () => {
  await Product.destroy({ where: {} });
  await User.destroy({ where: {} });
  await SubSubCategory.destroy({ where: {} });
  await SubCategory.destroy({ where: {} });
  await Category.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
  console.log.mockRestore?.();
  console.info.mockRestore?.();
  console.debug.mockRestore?.();
  console.warn.mockRestore?.();
  console.error.mockRestore?.();
});
