import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { AppModule } from './app.module';

const httpsOptions = {
  key: readFileSync(resolve(__dirname, '../secrets/privkey.pem')),
  cert: readFileSync(resolve(__dirname, '../secrets/cert.pem')),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await app.listen(443);
}
bootstrap();
