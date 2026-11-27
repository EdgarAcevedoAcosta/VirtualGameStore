import { validate } from 'class-validator';
import type { CompraRepository } from './Entidades/compra.repository';
import { CrearCompraDto } from './dto/crear-compra';
import { CompraService } from './compra.service';

describe('CompraService', () => {
  const repo: jest.Mocked<CompraRepository> = {
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    crearCompra: jest.fn(),
    actualizarCompra: jest.fn(),
    eliminarCompra: jest.fn(),
  };
  const servicio = new CompraService(repo);

  it('acepta fecha ISO y total decimal al validar la creación', async () => {
    const dto = Object.assign(new CrearCompraDto(), {
      idUsuario: 1,
      idDireccion: 2,
      fecha: '2026-11-26',
      total: 15.5,
      estado: 'pendiente',
      idCarrito: 3,
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('convierte la fecha del formulario a Date antes de persistir', async () => {
    const dto = Object.assign(new CrearCompraDto(), {
      idUsuario: 1,
      idDireccion: 2,
      fecha: '2026-11-26',
      total: 15.5,
      estado: 'pendiente',
      idCarrito: 3,
    });

    repo.crearCompra.mockResolvedValue({
      idCompra: 4,
      idUsuario: dto.idUsuario,
      idDireccion: dto.idDireccion,
      fecha: new Date(`${dto.fecha}T00:00:00.000Z`),
      total: dto.total,
      estado: dto.estado,
      idCarrito: dto.idCarrito,
    });

    await servicio.crearCompra(dto);

    expect(repo.crearCompra).toHaveBeenCalledWith({
      ...dto,
      fecha: new Date(`${dto.fecha}T00:00:00.000Z`),
    });
  });
});
