import type Order from "../entity/order.js";
import type RepositoryInterface from "./repository-interface.js";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }