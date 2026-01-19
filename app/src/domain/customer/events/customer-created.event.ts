import type EventInterface from "../@shared/event.interface.js";


class CustomerCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}

export default CustomerCreatedEvent;