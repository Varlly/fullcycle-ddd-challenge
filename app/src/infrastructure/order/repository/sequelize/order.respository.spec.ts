import CustomerRepository from "../../../customer/repository/sequelize/customer.respository.js";
import ProductRepository from "../../../product/repository/sequelize/product.repository.js";
import CustomerModel from "../../../customer/repository/sequelize/customer.model.js";
import ProductModel from "../../../product/repository/sequelize/product.model.js";
import Address from "../../../../domain/customer/value-object/address.js";
import OrderItem from "../../../../domain/checkout/entity/order_item.js";
import Customer from "../../../../domain/customer/entity/customer.js";
import Product from "../../../../domain/product/entity/products.js";
import Order from "../../../../domain/checkout/entity/order.js";
import OrderRepository from "./order.respository.js";
import OrderItemModel from "./order-item.model.js";
import OrderModel from "./order.model.js";

import { Sequelize } from "sequelize-typescript";

describe('Order Repository test', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        // instance new customer repository
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        // persist customer
        await customerRepository.create(customer);

        // instance new product respository
        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        // persist product
        await productRepository.create(product);

        // instance new order item object-value
        const orderItem = new OrderItem(1, product.id, product.name, product.price, 2);

        // instance new order repository
        const orderRepository = new OrderRepository();
        const order = new Order("o1", "c1", [orderItem]);
        // persist order
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel!.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "o1",
                    product_id: "p1",
                    total: orderItem.total()
                }
            ]
        });
    });

    it('should update item in an order', async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(1, product.id, product.name, product.price, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("o1", "c1", [orderItem]);
        await orderRepository.create(order);

        // test
        const orderItem2 = new OrderItem(2, product.id, product.name, product.price, 3);
        order.changeItems([orderItem2]);
        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(updatedOrderModel!.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total(),
            items: [
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: "o1",
                    product_id: "p1",
                    total: orderItem2.total()
                }
            ]
        });
    });

    it('should retrieve an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(1, product.id, product.name, product.price, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("o1", "c1", [orderItem]);
        await orderRepository.create(order);

        // test retrieve order
        const foundOrder = await orderRepository.find("o1");

        expect(foundOrder).toStrictEqual(order);
    });

    it('should retrieve all orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(1, product.id, product.name, product.price, 2);
        const orderItem2 = new OrderItem(2, product.id, product.name, product.price, 3);

        const orderRepository = new OrderRepository();
        const order1 = new Order("o1", "c1", [orderItem1]);
        await orderRepository.create(order1);

        const order2 = new Order("o2", "c1", [orderItem2]);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });
});