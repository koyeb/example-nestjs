import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3001;
console.log(`Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();