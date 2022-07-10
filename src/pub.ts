import { Injectable } from "@nestjs/common";
import { Config, EventsClient, Utils } from "kubemq-js";

@Injectable()
export class PublishService {
    private eventsClient;

    public constructor(connectionString: string) {
        const opts: Config = {
            address: connectionString,
            clientId: Utils.uuid(),
        };

        this.eventsClient = new EventsClient(opts);
    }

    public async sendMessage<T>(message: T, channel: string) {
        await this.eventsClient.send({
            channel,
            body: Utils.stringToBytes(JSON.stringify(message)),
        });
    }
}