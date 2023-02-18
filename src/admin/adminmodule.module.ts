import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { ManagerService } from "src/manager/manager.service";
import { ManagerEntity } from "src/manager/manager.entity";


@Module({
imports: [TypeOrmModule.forFeature([AdminEntity, ManagerEntity])],
controllers: [AdminController],
providers: [AdminService,ManagerService],

})

export class AdminModule {}