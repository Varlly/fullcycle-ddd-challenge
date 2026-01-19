import SendMessageOneWhenCustomerIsCreatedHandler from "../events/handler/send-message-one-when-customer-is-created.handler.js";
import SendMessageTwoWhenCustomerIsCreatedHandler from "../events/handler/send-message-two-when-customer-is-created.handler.js";
import SendMessageWhenCustomerChangedNameHandler from "../events/handler/send-message-when-customer-changed-name.handler.js";
import CustomerCreatedEvent from "../../event/customer/customer-created.event.js";
import EventDispatcher from "../../event/@shared/event-dispatcher.js";
import Customer from "./customer.js";
import Address from "../value-object/address.js";

import { jest } from '@jest/globals';

describe('Customer Espec Entity', () => {

  it('should get 1 as result', () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrow("Id is required");
  });

  it('should throw an error when name is empty', () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it('should notify event handlers when customer is created', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessageOneWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessageTwoWhenCustomerIsCreatedHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    let customer = new Customer("1", "John");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });

  it('should change name', () => {

    let customer = new Customer("1", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it('should change address', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangedNameHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    let customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City", "12345-678");
    customer.Address = address;

    const newAddress = new Address("Street 2", 124, "City", "12345-679");
    customer.changeAddress(newAddress);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    expect(customer.address).toEqual(newAddress);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should activate customer', () => {

    let customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City", "12345-678");
    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw an error when address is not set and customer is activated', () => {

    expect(() => {
      let customer = new Customer("1", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it('should deactivate customer', () => {

    let customer = new Customer("1", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {

    let customer = new Customer("1", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });

});