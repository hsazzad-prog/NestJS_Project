import { IsNotEmpty, IsInt, Length } from "class-validator";

export class AdminFormUpdate {   
   
   @Length(3,8)
    name: string;



}