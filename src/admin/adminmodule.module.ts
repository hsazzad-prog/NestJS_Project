import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { ManagerService } from "src/manager/manager.service";
import { ManagerEntity } from "src/manager/manager.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'your email address',
                       pass: 'your app password'
                   },
                  }
      }),
      
    TypeOrmModule.forFeature([AdminEntity, ManagerEntity]),

],
controllers: [AdminController],
providers: [AdminService,ManagerService],

})

export class AdminModule {}