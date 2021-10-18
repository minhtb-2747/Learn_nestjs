import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './module/tasks/tasks.module';
import KpiModule from './module/kpis/kpis.module';
import { AuthMiddleware } from './middleware/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  //setup env https://www.youtube.com/watch?v=aDlBnxVzS_Q
  imports: [ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServer: ConfigService) => {
        const isProduction = configServer.get("MODE") === "production";
       
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnathorized: false } : null,
          },
          type: "postgres",
          autoLoadEntities: true,
          synchronize: true,
          host: configServer.get("DB_HOST"),
          port: configServer.get("DB_PORT"),
          username: configServer.get("DB_USERNAME"),
          password: configServer.get("DB_PASSWORD"),
          database: configServer.get("DB_DATABASENAME"),
        }
      }
    })
    ,TasksModule, KpiModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

  
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController)
    // .forRoutes({ path: '*', method: RequestMethod.ALL }); // apply on all routes
  }
}
