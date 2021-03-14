import * as dotenv from 'dotenv';
if (process.env.NODE_ENV == 'development') {
  dotenv.config();
}

import { client, TextMessage } from './line';
import { getMessage } from './message';
import { getMoment } from './date';

export async function handler(): Promise<{
  statusCode: string;
  body?: string;
}> {
  const tomorrow = getMoment().add(1, 'days');
  // console.log(tomorrow);

  const message = getMessage(tomorrow);
  // console.log(message);

  if (message) {
    const postMessage: TextMessage = {
      type: 'text',
      text: message
    };

    try {
      await client.pushMessage(process.env.USER_ID as string, postMessage);
    } catch (error) {
      console.log(error);
    }

    return {
      statusCode: '200',
      body: JSON.stringify(postMessage)
    };
  }

  // return no message
  return {
    statusCode: '200'
  };
}

// localで確認したい時
if (process.env.NODE_ENV == 'development') {
  console.log(handler());
}
