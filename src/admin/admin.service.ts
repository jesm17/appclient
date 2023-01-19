import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createAdminDto: CreateUserDto) {
    const emailFound = await this.userModel.findOne({
      email: createAdminDto.email,
    });
    const usernameFound = await this.userModel.findOne({
      username: createAdminDto.username,
    });
    if (emailFound || usernameFound) {
      return new HttpException(
        'El email o nombre de usuario ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }
    const newAdmin = new this.userModel(createAdminDto);
    newAdmin.save();
    return {
      message: 'Se registro el nuevo administrador',
      status: HttpStatus.OK,
    };
  }

  async findAll() {
    const admins = await this.userModel.find({
      rol: 'admin',
    });

    return admins;
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.userModel.findByIdAndUpdate(id, updateAdminDto);
    return {
      message: 'Administrador actualizado con exito',
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return { message: 'Administrador eliminado', status: HttpStatus.OK };
  }
}
