import type CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface.js";
import type Customer from "../../../../domain/customer/entity/customer.js";
import CustomerModel from "./customer.model.js";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipCode: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

    find(id: string): Promise<Customer> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Customer[]> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipCode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }

}