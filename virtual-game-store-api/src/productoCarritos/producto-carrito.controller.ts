import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductoCarritoService } from './producto-carrito.service';
import { Publico } from 'src/auth/decoradores/publico-decorador';
import { AgregarProductoCarritoDto } from './dto/agregar-producto-carrito';
import { ActualizarProductoCarritoDto } from './dto/actualizar-producto-carrito';

@Controller('productoCarritos')
export class ProductoCarritoController {
  constructor(private readonly servicio: ProductoCarritoService) {}

  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /producto/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const producto = await this.servicio.buscarPorId(Number(id));
    if (!producto) {
      throw new NotFoundException(`No existe el producto en el carrito ${id}`);
    }
    return producto;
  }

  /** POST /producto */
  @Post()
  @HttpCode(201)
  crearUsuario(@Body() dto: AgregarProductoCarritoDto) {
    return this.servicio.crearProductoCarrito(dto);
  }

  /** PATCH /producto/2 */
  @Patch(':id')
  async actualizarProducto(
    @Param('id') id: string,
    @Body() dto: ActualizarProductoCarritoDto,
  ) {
    const productoC = await this.servicio.actualizarProductoCarrito(
      Number(id),
      dto,
    );
    if (!productoC) {
      throw new NotFoundException(`No existe el producto en el carrito ${id}`);
    }
    return productoC;
  }

  /** DELETE /producto/2 */
  @Delete(':id')
  async eliminarProducto(@Param('id') id: string) {
    const producto = await this.servicio.eliminarProductoCarrito(Number(id));
    if (!producto) {
      throw new NotFoundException(`No existe el producto en el carrito${id}`);
    }
    return producto;
  }
}
