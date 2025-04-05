import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import
  {
    DocumentBuilder,
    SwaggerModule,
  } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bookmark api')
    .setDescription(
      'The test ->> bookmark API description',
    )
    .setVersion('1.0')
    // .addTag('bookmark')
    // .addTag('user')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'api',
    app,
    documentFactory,
  );

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3333);
}
void bootstrap();
