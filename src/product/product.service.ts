import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, productDocument } from './entities/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<productDocument>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    newProduct.save();
    return {
      message: 'Se ha agregado un nuevo producto',
      status: HttpStatus.OK,
    };
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.productModel.findByIdAndUpdate(id, updateProductDto);
    return { message: 'Producto actualziado con exito', status: HttpStatus.OK };
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id);

    return { message: 'Producto eliminado con exito', status: HttpStatus.OK };
  }
}
