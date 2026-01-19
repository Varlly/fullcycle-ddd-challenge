import type RepositoryInterface from "../../@shared/respository/repository-interface.js";
import type Product from "../product/entity/products.js";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> { }