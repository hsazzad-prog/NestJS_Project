import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminForm } from './adminform.dto';
import { AdminFormUpdate } from './adminformupdate.dto';
import { AdminService } from './adminservice.service';

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
  @UsePipes(new ValidationPipe())
  updateAdmin(@Body('name') name: string, @Body('id') id: number): any {
    return this.adminService.updateUser(name, id);
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



}
