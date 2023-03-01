import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import { AdminForm } from "./adminform.dto";
import { AdminFormUpdate } from "./adminformupdate.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService
      
        ) {}

getIndex():any { 
    return this.adminRepo.find();

}
getUserByID(id):any {
    return this.adminRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
    return this.adminRepo.findOneBy({ id:qry.id,name:qry.name });
}

insertUser(mydto:AdminForm):any {
    const adminaccount = new AdminEntity()
    adminaccount.name = mydto.name;
    adminaccount.email = mydto.email;
    adminaccount.password = mydto.password;
    adminaccount.address = mydto.address;
   return this.adminRepo.save(adminaccount);
      }

updateUser(name,email):any {
   
    return this.adminRepo.update({email:email},{name:name});
    }
updateUserbyid(mydto:AdminFormUpdate,id):any {
    return this.adminRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.adminRepo.delete(id);
    }
    
    getManagersByAdminID(id):any {
        return this.adminRepo.find({ 
                where: {id:id},
            relations: {
                managers: true,
            },
         });
    }
    
async signup(mydto) {
const salt = await bcrypt.genSalt();
const hassedpassed = await bcrypt.hash(mydto.password, salt);
mydto.password= hassedpassed;
return this.adminRepo.save(mydto);
}

async signin(mydto){
    console.log(mydto.password);
const mydata= await this.adminRepo.findOneBy({email: mydto.email});
const isMatch= await bcrypt.compare(mydto.password, mydata.password);
if(isMatch) {
return 1;
}
else {
    return 0;
}

}

async sendEmail(mydata){
 return   await this.mailerService.sendMail({
        to: mydata.email,
        subject: mydata.subject,
        text: mydata.text, 
      });

}


}