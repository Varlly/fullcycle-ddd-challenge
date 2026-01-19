import type Customer from "../customer/entity/customer.js";
import type RepositoryInterface from "../../@shared/respository/repository-interface.js";


export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> { }
