import type EventHandlerInterface from "../../@shared/event-handler.interface.js";
import type ProductCreatedEvent from "../product-created.event.js";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(
            `Sending email notification for product created:......`,
        );
    }
} 