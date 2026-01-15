import Customer from "../entity/customer.js";
import Order from "../entity/order.js";
import OrderItem from "../entity/order_item.js";
import OrderService from "./order.service.js";

describe("Order Service unit tests", () => {

    it("should place an order", () => {        

        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem(1, "p1", "Product 1", 100, 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);

    });

    it("should get total of all orders", () => {

        const item1 = new OrderItem(1, "p1", "Product 1", 100, 2);
        const item2 = new OrderItem(2, "p2", "Product 2", 200, 1);

        const order = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c2", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(400);
    });
});