import Product from "./products.js";

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            // @ts-ignore
            let product = new Product("", "Product 1", 100);
        }).toThrow("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrow("Name is required");
    });

    it('should throw error when price is less to zero ', () => {
        expect(() => {
            let product = new Product("123", "Product 1", -1);
        }).toThrow("Price is less to zero");
    });

    it('should throw error when price is zero ', () => {
        expect(() => {
            let product = new Product("123", "Product 1", 0);
        }).toThrow("Price must be greater than zero or defined");
    });
    
    it('should throw error when change name', () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it('should change price', () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);

        expect(product.price).toBe(200);
    });
});