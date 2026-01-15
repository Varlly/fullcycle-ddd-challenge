import type RepositoryInterface from "./repository-interface.js";
import type Product from "../entity/products.js";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> { }