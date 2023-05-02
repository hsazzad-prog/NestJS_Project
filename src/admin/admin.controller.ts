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
  UseGuards,
  Res,
  Header,
  HttpCode
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
  ) { }
  @Get('/')
  gethellow(): any {
    return "hellow";
  }

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
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertAdmin(@Body() mydto:AdminForm,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  console.log(mydto)
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
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: '/uploads' })
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
    new MaxFileSizeValidator({ maxSize: 160000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  
console.log(mydto)
return this.adminService.signup(mydto);

}
  @Post('/signin')
  @UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:AdminForm)
  {
    const res = await (this.adminService.signin(mydto));
if(res==true)
{
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
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
