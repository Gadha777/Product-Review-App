import { NestFactory } from '@nestjs/core';//A core utility provided by NestJS to create an instance of the application.
import { AppModule } from './app.module';//The root module of the application that contains all controllers, services, and other modules.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',  // Replace '*' with your frontend URL if needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(5000);
}
bootstrap();
