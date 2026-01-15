import type Product from "../entity/products.js";


export default class ProductService {
    static increasePrice(products: Product[], percentage: number): Product[] {
        products.forEach(product => {
            const newPrice = product.price + (product.price * (percentage / 100));
            product.changePrice(newPrice);
        });
        return products;
    }
}