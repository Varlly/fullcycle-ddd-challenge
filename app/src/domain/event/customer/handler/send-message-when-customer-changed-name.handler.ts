import type EventHandlerInterface from "../../@shared/event-handler.interface.js";
import type CustomerCreatedEvent from "../customer-created.event.js";

class SendMessageWhenCustomerChangedNameHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Endereço do cliente: id: ${event.eventData.id}, nome: ${event.eventData.name} alterado para: ${event.eventData.address}`);
    }
}

export default SendMessageWhenCustomerChangedNameHandler;