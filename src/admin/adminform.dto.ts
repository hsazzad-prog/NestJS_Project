import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class AdminForm {   
   
    name: string;
   
    @IsEmail() 
    @IsNotEmpty()
    email: string;

    @Length(3, 8)
    @IsNotEmpty()
    password: string;

    address: string;

    filename:string;


}