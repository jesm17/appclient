import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';
import { HttpException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const emailFound = await this.userModel.findOne({
      email: createUserDto.email,
    });
    const usernameFound = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (emailFound || usernameFound) {
      return new HttpException(
        'El email o nombre de usuario ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }

    const newClient = new this.userModel(createUserDto);
    newClient.save();

    return { message: 'Se registro el nuevo cliente', status: HttpStatus.OK };
  }

  findAllClient() {
    const users = this.userModel.find({ rol: 'client' });

    return users;
  }

  findOneClient(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const clientUpdate = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return { message: 'Cliente actualizado', status: HttpStatus.OK };
  }

  async remove(id: string) {
    const deleteClient = await this.userModel.findByIdAndRemove(id);
    if (!deleteClient) {
      return { message: 'Cliente no encontrado', status: HttpStatus.NOT_FOUND };
    }

    return { message: 'Cliente eliminado', status: HttpStatus.OK };
  }
}
