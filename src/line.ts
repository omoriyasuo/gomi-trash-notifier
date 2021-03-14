import { Client, TextMessage } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string
};

const client = new Client(config);

export { client, TextMessage };
