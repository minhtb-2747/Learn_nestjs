import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './module/tasks/tasks.module';
import KpiModule from './module/kpis/kpis.module';
import { AuthMiddleware } from './middleware/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "task-management",
    autoLoadEntities: true,
    synchronize: true,
  }), TasksModule, KpiModule],
  controllers: [AppController],
  providers: [AppService],
})

  
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController)
    // .forRoutes({ path: '*', method: RequestMethod.ALL }); // apply on all routes
  }
}
