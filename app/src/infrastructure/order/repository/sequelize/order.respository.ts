import type OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface.js";
import OrderItemModel from "./order-item.model.js";
import OrderItem from "../../../../domain/checkout/entity/order_item.js";
import OrderModel from "./order.model.js";
import Order from "../../../../domain/checkout/entity/order.js";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                total: item.total(),
                order_id: entity.id
            }))
        }, {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total()
        }, {
            where: { id: entity.id }
        });

        await OrderItemModel.destroy({ where: { order_id: entity.id } });

        for (const item of entity.items) {
            await OrderItemModel.create({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                total: item.total(),
                order_id: entity.id
            });
        }
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: ["items"]
        });

        if (!orderModel) {
            throw new Error("Order not found");
        }
        const items = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
        });

        return new Order(orderModel.id, orderModel.customer_id, items);
    }
    async findAll(): Promise<Order[]> {

        const orderModels = await OrderModel.findAll({ include: ["items"] });

        if (orderModels.length === 0) {
            return [];
        }

        return orderModels.map((orderModel) => {
            const items = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);
            });

            return new Order(orderModel.id, orderModel.customer_id, items);
        });
    }
}
