import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminForm } from './adminform.dto';
import { AdminFormUpdate } from './adminformupdate.dto';
import { AdminService } from './adminservice.service';
import { SessionGuard } from './session.guard';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService,
    private managerService: ManagerService
    ) {}

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }
  
  @Get('/findadmin/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getUserByID(id);
  }

  @Get('/findadmin')
  getAdminByIDName(@Query() qry: any): any {
    return this.adminService.getUserByIDName(qry);
  }
  @Post('/insertadmin')
@UsePipes(new ValidationPipe())
  insertAdmin(@Body() mydto: AdminForm): any {
    return this.adminService.insertUser(mydto);
  }

  @Put('/updateadmin/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.adminService.updateUser(name, session.email);
  }

  @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: AdminFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteUserbyid(id);
   
  }

  @Post('/insertmanager')
  @UsePipes(new ValidationPipe())
    insertManager(@Body() managerdto: ManagerForm): any {
      return this.managerService.insertManager(managerdto);
    }
   
    @Get('/findmanagersbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getManagersByAdminID(id);
    }

    @Get('/findadminbymanager/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.getAdminByManagerID(id);
    }
   
@Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:AdminForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.adminService.signup(mydto);
console.log(file)
}
@Get('/signin')
signin(@Session() session, @Body() mydto:AdminForm)
{
if(this.adminService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
 
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
@Post('/sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}





}
