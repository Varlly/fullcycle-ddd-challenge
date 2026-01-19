import type ProductRepositoryInterface from "../../../../domain/product/respository/product-repository.interface.js";
import Product from "../../../../domain/product/entity/products.js";
import ProductModel from "./product.model.js";

export default class ProductRepository implements ProductRepositoryInterface {

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });
        if (!productModel) {
            throw new Error("Product not found");
        }

        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(
            (productModel) => new Product(productModel.id, productModel.name, productModel.price)
        );
    }

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

}