import type Order from "../entity/order.js";
import type RepositoryInterface from "../../@shared/respository/repository-interface.js";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }