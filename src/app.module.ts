import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './module/tasks/tasks.module';
import KpiModule from './module/kpis/kpis.module';
import { AuthMiddleware } from './middleware/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  //setup env https://www.youtube.com/watch?v=aDlBnxVzS_Q
  imports: [ConfigModule.forRoot({isGlobal: true,}), TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "task-management",
    autoLoadEntities: true,
    synchronize: true,
  }), TasksModule, KpiModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

  
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController)
    // .forRoutes({ path: '*', method: RequestMethod.ALL }); // apply on all routes
  }
}
