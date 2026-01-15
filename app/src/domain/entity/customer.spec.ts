import Address from "./address.js";
import Customer from "./customer.js";

describe('Customer Espec Entity', () => {

  it('should get 1 as result', () => {
    expect( () => {
      let customer = new Customer ("", "John");
    }).toThrow("Id is required");
  });

  it('should throw an error when name is empty', () => {
    expect( () => {
      let customer = new Customer ("123", "");
    }).toThrow("Name is required");
  });

  it('should change name', () => {

    let customer = new Customer ("1", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it('should activate customer', () => {

    let customer = new Customer ("1", "John");
    const address = new Address("Street 1", 123, "City", "12345-678");
    customer.Address =  address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw an error when address is not set and customer is activated', () => {

    expect( () => {
      let customer = new Customer ("1", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it('should deactivate customer', () => {

    let customer = new Customer ("1", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {

    let customer = new Customer ("1", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});