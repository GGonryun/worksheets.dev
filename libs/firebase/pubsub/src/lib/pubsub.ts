import { pubsub } from '@worksheets/firebase/server';
import { CodedFailure } from '@worksheets/util/errors';

async function publish<T>(name: string, message: T): Promise<string> {
  console.info(`[BUS][${name}][REQ] publishing message`, message);
  const topic = pubsub().topic(name);
  const data = JSON.stringify(message);
  const dataBuffer = Buffer.from(data);
  try {
    const id = await topic.publishMessage({ data: dataBuffer });
    // log that message was published successfully to the queue name
    console.info(`[BUS][${name}][OK] message ${id} published`);
    return id;
  } catch (error) {
    // log error
    console.error(`[BUS][${name}][ERR] failed to publish to queue`, error);
    // throw new pubsub error
    throw new PubSubFailure({
      code: 'unknown',
      message: `failed to publish message to pubsub queue ${name}`,
      cause: error,
    });
  }
}

export interface PubSubBus<T> {
  publish: PublishFn<T>;
}

type PublishFn<T> = (message: T) => Promise<string>;
export function newPubSub<T>(key: string): PubSubBus<T> {
  return {
    publish: publish.bind({}, key) as PublishFn<T>,
  };
}

// create a new pubsub coded failure class
export class PubSubFailure extends CodedFailure<'unknown'> {}
