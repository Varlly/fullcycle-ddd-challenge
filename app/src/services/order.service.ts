import type OrderItem from '../domain/entity/order_item.js';
import type Customer from '../domain/entity/customer.js';
import Order from '../domain/entity/order.js';
import {v4 as uuid} from 'uuid';

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {

        if (items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(Math.floor(order.total() / 2));

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((sum, order) => sum + order.total(), 0);
    }

}