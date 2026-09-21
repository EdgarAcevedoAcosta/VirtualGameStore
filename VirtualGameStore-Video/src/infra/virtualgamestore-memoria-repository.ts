import { Usuario, Producto, Compra } from "../dominio/entidades";
import { NuevaCompra } from "../dominio/virtualgamestore-repository";
export class VirtualGameStoreMemoriaRepository {
  private usuarios: Usuario[] = [
    {
      idusuario: 1,
      nombre: "Edgar",
      correo: "cliente@example.com",
      contrasena: "password123",
      rol: "cliente",
      direcciones: [],
      activo: "activo",
    },
  ];

  private productos: Producto[] = [
    {
      idProducto: 1,
      nombre: "Call of Duty 3",
      descripcion: "Es un campo 5vs5",
      precio: 2500,
      stock: 4,
      categoria: [],
      imagenUrl: "",
      estado: "activo",
    },
  ];
  private compras: Compra[] = [];

  async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.find((p) => p.idusuario === id) || null;
  }

  async buscarProductoPorId(id: number): Promise<Producto | null> {
    return this.productos.find((p) => p.idProducto === id) || null;
  }

  async actualizarProducto(producto: Producto): Promise<Producto> {
    const indice = this.productos.findIndex((p) => p.idProducto === producto.idProducto);
    if (indice !== -1) {
      this.productos[indice] = producto;
    }
    return producto;
  }

  async guardarCompra(compra: NuevaCompra): Promise<Compra> {
    const compras = this.compras.length;
    const nueva: Compra = {
      ...compra,

      idCompra: compras + 1, // Se genera un ID en memoria
    };
    this.compras.push(nueva);
    return nueva;
  }
}
