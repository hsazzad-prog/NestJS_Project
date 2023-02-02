import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './admin/adminmodule.module';

@Module({
  imports: [AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
