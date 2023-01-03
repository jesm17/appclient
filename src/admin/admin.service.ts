import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createAdminDto: CreateUserDto) {
    const uniqueDataFound = await this.userRepository.findOne({
      where: [
        { email: createAdminDto.email },
        { username: createAdminDto.username },
      ],
    });

    if (uniqueDataFound) {
      return {
        message: 'El correo o nombre de usuario ya se encuentra registrado',
        status: 500,
      };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createAdminDto.password, saltOrRounds);
    createAdminDto.password = hash;
    const newAdmin = await this.userRepository.create(createAdminDto);
    this.userRepository.save(newAdmin);

    return { message: 'Administrador creado', status: 200 };
  }

  async findAllAdmins() {
    const admins = await this.userRepository.find({
      where: { rol: 'admin' },
    });

    admins.forEach((admin) => {
      delete admin.password;
    });

    return admins;
  }

  async findOneAdmin(id: number) {
    const admin = await this.userRepository.findOne({
      where: { id: id, rol: 'admin' },
    });
    delete admin.password;
    return admin;
  }

  async findOneClient(id: number) {
    const client = await this.userRepository.findOne({
      where: { id: id, rol: 'client' },
    });
    delete client.password;
    return client;
  }

  async findBuysClienById(id: number) {
    const clientBuys = await this.userRepository.find({
      where: { id: id },
      relations: ['compras'],
    });
    return clientBuys;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateAdminDto.password, saltOrRounds);
      updateAdminDto.password = hash;
    }
    const adminUpdate = await this.userRepository.update(id, updateAdminDto);
    return { message: 'Se actualizo con exito', adminUpdate, status: 200 };
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return { message: 'Usuario eliminado', status: 200 };
  }

  async findAllUsers() {
    const users = await this.userRepository.find({ where: { rol: 'client' } });
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }
}
