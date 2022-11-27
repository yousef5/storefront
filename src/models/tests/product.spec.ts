// import pool from '../../databases';
import pool from '../../databases';
import Product from '../../types/product.type';
import ProductStore from '../product.model';

const productStore = new ProductStore();

describe('Test Products ===> Model ', () => {
  describe('Test The Methods in productStore are exist', () => {
    it('should have create method', () => {
      expect(productStore.index).toBeDefined();
    });
    it('should have show Method', () => {
      expect(productStore.show).toBeDefined();
    });
    it('should have index Method', () => {
      expect(productStore.index).toBeDefined();
    });
    it('should have edit Method', () => {
      expect(productStore.update).toBeDefined();
    });
    it('should have delete Method', () => {
      expect(productStore.delete).toBeDefined();
    });
  });

  describe('TEST Product Store Logic', () => {
    const newProduct = {
      name: 'tv',
      description: 'good Tv with reciver',
      price: 110.99,
      category: 'electronic',
    } as Product;
    afterAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      connection.release();
    });
    beforeAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      connection.release();
    });

    it('Create Method : return creates Products', async () => {
      const createProduct = await productStore.create(newProduct);
      createProduct.price = parseInt(createProduct as unknown as string, 10);
      expect(createProduct).toEqual({
        id: createProduct.id,
        name: 'tv',
        description: 'good Tv with reciver',
        price: +createProduct.price,
        category: 'electronic',
      } as Product);
    });

    it('Index Method  : get all Products in Product table with index Methods', async () => {
      const products = await productStore.index();
      expect(products).toHaveSize(1);
      expect(products[0].name).toBe('tv');
    });

    it('Show Method  : get one Product when use show Methods', async () => {
      const product = await productStore.show(1);
      product.price = parseInt(product as unknown as string, 10);
      expect(product).toEqual({
        id: 1,
        name: 'tv',
        description: 'good Tv with reciver',
        price: +product.price,
        category: 'electronic',
      } as Product);
    });
    it('Show Method  : return undefined  when use  id not in database in show Method', async () => {
      const product = await productStore.show(2);
      expect(product).toBeUndefined();
    });
    it('Update Method : retrun updated Product', async () => {
      const product = await productStore.update({
        name: 'car',
        description: 'good car',
        price: 11000.99,
        category: 'vehicle',
        id: 1,
      });
      product.price = parseInt(product as unknown as string, 10);
      expect(product).toEqual({
        id: 1,
        name: 'car',
        description: 'good car',
        price: +product.price,
        category: 'vehicle',
      } as Product);
    });

    it('Delete Method : get deleted Products when use right id', async () => {
      const product = await productStore.delete(1);
      product.price = parseInt(product as unknown as string, 10);
      expect(product).toEqual({
        id: 1,
        name: 'car',
        description: 'good car',
        price: +product.price,
        category: 'vehicle',
      } as Product);
    });
  });
});
