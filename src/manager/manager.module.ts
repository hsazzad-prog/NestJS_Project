import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "./manager.entity";



@Module({
imports: [TypeOrmModule.forFeature([ManagerEntity])],
controllers: [],
providers: [],

})

export class ManagerModule {}