import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"


@Module({
imports: [TypeOrmModule.forFeature([AdminEntity])],
controllers: [AdminController],
providers: [AdminService],

})

export class AdminModule {}