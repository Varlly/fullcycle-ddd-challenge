//EnviaConsoleLog1Handler

import type EventHandlerInterface from "../../@shared/event-handler.interface.js";
import type CustomerCreatedEvent from "../customer-created.event.js";

class SendMessageOneWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}

export default SendMessageOneWhenCustomerIsCreatedHandler;  