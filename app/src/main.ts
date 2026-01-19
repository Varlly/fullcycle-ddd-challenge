import OrderItem from "./domain/entity/order_item.js";
import Customer from "./domain/customer/entity/customer.js";
import Address from "./domain/customer/value-object/address.js";
import Order from "./domain/entity/order.js";

let customer = new Customer("1", "John Doe");
let address = new Address("123 Main St", 100, "Cityville", "12345");
customer.Address = address;

let item1 = new OrderItem(1, "i1", "Item 1", 50, 1);
let item2 = new OrderItem(2, "i2", "Item 2", 75, 2);

let order = new Order("1", "123", [item1, item2]);

console.log(`Customer: ${customer.name}, Address: ${customer.address.toString()}`);