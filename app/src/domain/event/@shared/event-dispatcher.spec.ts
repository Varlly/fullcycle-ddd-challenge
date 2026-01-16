import { jest } from '@jest/globals';
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler.js";
import ProductCreatedEvent from "../product/product-created.event.js";
import EventDispatcher from "./event-dispatcher.js";

describe('Domain events tests', () => {
    it('Should register an event handler', () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        const eventHandlers = eventDispatcher.getEventHandlers['ProductCreatedEvent'];
        expect(eventHandlers).toBeDefined();
        expect(eventHandlers).toHaveLength(1);
        expect(eventHandlers?.[0]).toMatchObject(eventHandler);
    });

    it('Should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
        const eventHandlers = eventDispatcher.getEventHandlers['ProductCreatedEvent'];
        expect(eventHandlers).toBeDefined();
        expect(eventHandlers).toHaveLength(0);
    });

    it('Should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        eventDispatcher.unregisterAll();
        const eventHandlers = eventDispatcher.getEventHandlers['ProductCreatedEvent'];
        expect(eventHandlers).toBeUndefined();
    }); 
    
    it('Should notify all event handlers', () => {  
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            id: 'p1',
            name: 'Product 1',
            price: 100
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

}); 