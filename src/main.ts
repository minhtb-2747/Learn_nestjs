import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT;
  console.log('port', port);
  await app.listen(port ? port: 3000);
}
bootstrap();
