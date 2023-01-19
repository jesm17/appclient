import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { editFileName } from './utils/file-upload.utils';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.rol = 'client';
    createUserDto.password = hash;
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAllClient();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneClient(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/uploads/admin',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() photo,
  ) {
    if (photo) {
      const response = { originalname: '', filename: '' };
      response.originalname = photo.originalname;
      response.filename = photo.filename;
      updateUserDto.photo = '/uploads/admin/' + response.filename;
    }

    if (updateUserDto.password != 'undefined') {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
      console.log(true);
    } else {
      delete updateUserDto.password;
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
