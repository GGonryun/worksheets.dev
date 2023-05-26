import { pubsub } from '@worksheets/firebase/server';

async function publish<T>(
  name: string,
  message: T
): Promise<string | undefined> {
  console.info(`bus: publishing message to pubsub queue ${name}`, message);
  const topic = pubsub().topic(name);
  const data = JSON.stringify(message);
  const dataBuffer = Buffer.from(data);
  try {
    return await topic.publishMessage({ data: dataBuffer });
  } catch (error) {
    console.error(`bus(${name}): failed to publish message`, error);
    throw error;
  }
}

export interface PubSubBus<T> {
  publish: PublishFn<T>;
}

type PublishFn<T> = (message: T) => Promise<string | undefined>;
export function newPubSub<T>(key: string): PubSubBus<T> {
  return {
    publish: publish.bind({}, key) as PublishFn<T>,
  };
}
