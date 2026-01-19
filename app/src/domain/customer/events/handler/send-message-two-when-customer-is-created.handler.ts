//EnviaConsoleLog1Handler

import type EventHandlerInterface from "../../../event/@shared/event-handler.interface.js";
import type CustomerCreatedEvent from "../../../event/customer/customer-created.event.js";

class SendMessageTwoWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}

export default SendMessageTwoWhenCustomerIsCreatedHandler;  