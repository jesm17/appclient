import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const newProduct = await this.productoRepository.create(createProductoDto);
    this.productoRepository.save(newProduct);
    return { status: 200, message: 'Se registro el nuevo producto con exito' };
  }

  async findAll() {
    const productos = await this.productoRepository.find();

    return productos;
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
    });
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.productoRepository.update(id, updateProductoDto);
    return { status: 200, message: 'Se actualizo con exito' };
  }

  async remove(id: number) {
    await this.productoRepository.delete(id);

    return { status: 200, message: 'Se elimino el producto con exito' };
  }
}
