import { Injectable } from '@nestjs/common';
import { Config, EventsClient, Utils } from 'kubemq-js';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class SubscribeService {

    private eventsClient: EventsClient;
    private group: string;
    private clientId: string;

    public constructor(groupId: string, connectionString: string) {
        const opts: Config = {
            address: connectionString,
            clientId: Utils.uuid(),
        };

        this.eventsClient = new EventsClient(opts);
        this.clientId = Utils.uuid();
        this.group = groupId;
    }

    public getChannel<T>(channel: string) {
        const config = {
            channel: channel,
            group: this.group,
            clientId: this.clientId,
        };

        const sub: ReplaySubject<T> = new ReplaySubject(1);
        //TODO unsubsribe and place the sub into a variable 
        this.eventsClient
            .subscribe(config,
                (err, msg) => {
                    if (err) {
                        console.error(this.clientId, err);
                        return;
                    }
                    if (msg) {
                        sub.next(<T>JSON.parse(Utils.bytesToString(msg.body)));
                    }
                },
            )
            .catch((reason) => {
                console.log(reason);
            });
        return sub.asObservable();
    }

    public destoryChannel(channel: string) {
        //TODO destroy
    }
}
