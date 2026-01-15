import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model.js";
import Customer from "../../domain/entity/customer.js";
import Address from "../../domain/entity/address.js";
import CustomerRepository from "./customer.respository.js";


describe('Customer Repository test', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(new Address('Street 1', 123, 'City 1', '12345'));
        customer.addRewardPoints(10);
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

        expect(customerModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 1',
            street: 'Street 1',
            number: 123,
            zipCode: '12345',
            city: 'City 1',
            active: true,
            rewardPoints: 10
        });
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(new Address('Street 1', 123, 'City 1', '12345'));
        customer.addRewardPoints(10);
        customer.activate();
        await customerRepository.create(customer);

        customer.changeName('Updated Customer 1');
        customer.changeAddress(new Address('Street 2', 456, 'City 2', '67890'));
        customer.addRewardPoints(20);
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

        expect(customerModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Updated Customer 1',
            street: 'Street 2',
            number: 456,
            zipCode: '67890',
            city: 'City 2',
            active: true,
            rewardPoints: 30
        });
    });
});