import { Provider } from '@nestjs/common';
import { PublishService } from './pub';
import { SubscribeService } from './sub';

export class BusModule {
    static initConsumer(groupId: string, connectionString: string): Provider<SubscribeService> {
        return ({
            provide: SubscribeService, useFactory: () => {
                return new SubscribeService(groupId, connectionString);
            }
        });
    }

    static initPublisher(connectionString: string): Provider<PublishService> {
        return ({
            provide: PublishService, useFactory: () => {
                return new PublishService(connectionString);
            }
        });
    }

    static init(groupId: string, connectionString: string): Provider<any>[] {
        return [{
            provide: SubscribeService, useFactory: () => {
                return new SubscribeService(groupId, connectionString);
            }
        }, {
            provide: PublishService, useFactory: () => {
                return new PublishService(connectionString);
            }
        }];
    }
}
