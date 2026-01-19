import Product from "../../../../domain/product/entity/products.js";
import ProductRepository from "./product.repository.js";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model.js";
// import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('Product Repository test', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: '1' } });

        expect(productModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100
        });
    });

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);
        await productRepository.create(product);

        product.changeName('Updated Product 1');
        product.changePrice(150);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({ where: { id: '1' } });

        expect(productModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Updated Product 1',
            price: 150
        });
    });

    it('should find a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);
        await productRepository.create(product);

        const foundProduct = await productRepository.find('1');
        const productModel = await ProductModel.findOne({ where: { id: '1' } });

        expect(productModel!.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it('should find all products', async () => {
        const products = [];
        const productRepository = new ProductRepository();
        products.push(new Product('1', 'Product 1', 100));
        products.push(new Product('2', 'Product 2', 200));
        products.push(new Product('3', 'Product 3', 300));

        products.forEach(async (product) => {
            await productRepository.create(product);
        });

        const foundProducts = await productRepository.findAll();

        expect(products.length).toBe(3);
        expect(products).toEqual(foundProducts);
    });
});