import Order from "./order.js";
import OrderItem from "./order_item.js";

describe('Order Espec Entity', () => {

    it('should throw error when id is empty', () => {
        expect(() => {

            let item1 = new OrderItem(1, 'i1', "Item 1", 50, 2);
            let item2 = new OrderItem(2, 'i2', "Item 2", 75, 2);
            // @ts-ignore
            let order = new Order("", "123", [item1, item2]);
        }).toThrow("Id is required");
    });

    it('should throw error when customerId is empty', () => {
        expect(() => {

            let item1 = new OrderItem(1, 'i1', "Item 1", 50, 2);
            let item2 = new OrderItem(2, 'i2', "Item 2", 75, 2);

            // @ts-ignore
            let order = new Order("123", "", [item1, item2]);

        }).toThrow("CustomerId is required");
    });

    it('should throw error when customerId is empty', () => {
        expect(() => {

            // @ts-ignore
            let order = new Order("1", "123", []);
        }).toThrow("Items are required");
    });

    it('should calculate total', () => {
        let item1 = new OrderItem(1, 'i1', "Item 1", 50, 2);
        let item2 = new OrderItem(2, 'i2', "Item 2", 75, 2);
        let order = new Order("1", "123", [item1, item2]);

        expect(order.total()).toBe(250);
    });

    it('should throw error when the quantity is greater than zero', () => {
        expect(() => {
            let item1 = new OrderItem(1, 'i1', "Item 1", 50, 0);
            let order = new Order("1", "123", [item1]);
        }).toThrow("Quantity must be greater than zero");
    });

    it('should change order items ', () => {
        let item1 = new OrderItem(1, 'i1', "Item 1", 50, 2);
        let item2 = new OrderItem(2, 'i2', "Item 2", 75, 2);
        let order = new Order("1", "123", [item1]);

        expect(order.total()).toBe(100);

        order.changeItems([item1, item2]);

        expect(order.items.length).toBe(2);
        expect(order.total()).toBe(250);
    });

    it('should change customer id', () => {
        let item1 = new OrderItem(1, 'i1', "Item 1", 50, 2);
        let order = new Order("1", "123", [item1]);

        expect(order.customerId).toBe("123");

        order.changeCustomer("456");
        expect(order.customerId).toBe("456");
    });
});
