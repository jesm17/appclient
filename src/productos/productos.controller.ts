import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    const result = await this.productosService.create(createProductoDto);

    return result;
  }

  @Get('admin')
  @Render('admin/products')
  async findAll() {
    const productos = await this.productosService.findAll();

    return { productos };
  }
  @Get('')
  async findAllProducts() {
    const productos = await this.productosService.findAll();

    return productos;
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const producto = this.productosService.findOne(id);
    return producto;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productosService.remove(id);

    return result;
  }
}
