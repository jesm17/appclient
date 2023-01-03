import { Body, Controller, Get, Post } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  createCompra(@Body() createCompraDto: CreateCompraDto) {
    console.log(createCompraDto);
    return this.comprasService.create(createCompraDto);
  }

  @Get()
  getCompras() {
    return this.comprasService.getCompras();
  }
}
