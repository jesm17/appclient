import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { Buy, buyDocument } from './entities/buy.schema';

@Injectable()
export class BuyService {
  constructor(@InjectModel(Buy.name) private buyModel: Model<buyDocument>) {}
  create(createBuyDto: CreateBuyDto) {
    const newBuy = new this.buyModel(createBuyDto);
    newBuy.save();
    return { message: 'Compra creada con exito', statu: HttpStatus.OK };
  }

  findAll() {
    return `This action returns all buy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buy`;
  }

  update(id: number, updateBuyDto: UpdateBuyDto) {
    return `This action updates a #${id} buy`;
  }

  remove(id: number) {
    return `This action removes a #${id} buy`;
  }
}
