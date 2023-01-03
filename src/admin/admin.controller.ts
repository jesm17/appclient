import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';

import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/file-upload.utils';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/admin',
        filename: editFileName,
      }),
    }),
  )
  async create(@Body() createAdminDto: CreateUserDto, @UploadedFile() file) {
    const response = { originalname: '', filename: '' };
    if (file) {
      response.originalname = file.originalname;
      response.filename = file.filename;

      createAdminDto.image = '/uploads/admin/' + response.filename;
    }

    const message = await this.adminService.create(createAdminDto);
    return message;
  }

  @Get()
  @Render('admin/admin_view')
  async mainview() {
    const admins = await this.adminService.findAllAdmins();

    return { admins, message: null };
  }

  @Get('/client/get/:id')
  async getOneClient(@Param('id', ParseIntPipe) id: number) {
    const client = await this.adminService.findOneClient(id);
    return client;
  }

  @Get('client/getBuy/:id')
  @Render('admin/compras')
  async getView(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Get('client/getBuy-dateils/:id')
  getDeatils(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findBuysClienById(id);
  }
  
  @Get('get/:id')
  async findOneAdmin(@Param('id', ParseIntPipe) id: number) {
    const admin = await this.adminService.findOneAdmin(id);

    return admin;
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/admin',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file,
  ) {
    const response = { originalname: '', filename: '' };
    if (file) {
      response.originalname = file.originalname;
      response.filename = file.filename;

      updateAdminDto.image = '/uploads/admin/' + response.filename;
    } else {
      delete updateAdminDto.image;
    }
    if (!updateAdminDto.password) {
      delete updateAdminDto.password;
    }
    if (
      updateAdminDto.password != undefined &&
      updateAdminDto.password.length <= 8
    ) {
      return {
        message: 'La contraseña debe de tener almenos 8 caracteres',
        status: 500,
      };
    }

    return await this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  @Get('clients')
  @Render('admin/admin_view_clients')
  async getUsers() {
    const clients = await this.adminService.findAllUsers();
    return { clients };
  }

  @Post('addClient')
  addCliet(@Body() createAdminDto: any) {
    console.log(createAdminDto);
    return createAdminDto;
  }
}
