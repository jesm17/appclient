import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Compra } from './entities/compra.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra) private compraRepository: Repository<Compra>,
  ) {}

  create(createCompraDto: CreateCompraDto) {
    const newCompra = this.compraRepository.create(createCompraDto);
    const compra = this.compraRepository.save(newCompra);
    return compra;
  }

  getCompras() {
    const compras = this.compraRepository.find({
      relations: ['user'],
    });

    return compras;
  }
}
