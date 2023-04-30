import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/adminmodule.module';
import { ManagerModule } from './manager/manager.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AdminModule, ManagerModule, TypeOrmModule.forRoot(
   { type: 'postgres',
    host: 'postgresql://postgres:jMj4F2prfxt39RL2I3MY@containers-us-west-144.railway.app:7368/railway',
    port: 7368,
    username: 'postgres',
    password: 'jMj4F2prfxt39RL2I3MY',
    database: 'railway',
    autoLoadEntities: true,
    synchronize: true,
  }
  ),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
    serveRoot: '/public/' //last slash was important
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}