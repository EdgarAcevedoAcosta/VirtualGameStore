// Son todos los tipos de entidades pero resumidas al tipo de
// informacion que va a extraer de cada una de ellas,
// para no tener que traer toda la informacion de cada entidad

export interface Usuario {
  correo: string;
  nombre: string;
  rol: "admin" | "cliente";
}

export interface Sesion {
  token: string;
  usuario: Usuario;
}
// las demas si llevan id

export interface Categoria {
  idCategoria: number;
  nombre: string;
}
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}

export interface CategoriaProducto {
  idProducto: number;
  idCategoria: number;
}

export interface Direccion {
  idDireccion: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  idUsuario: number;
}

export interface Carrito {
  idCarrito: number;
  idUsuario: number;
  productoCarrito: ProductoCarrito[];
  total: number;
}

export interface ProductoCarrito {
  idProductoCarrito: number;
  idProducto: number;
  idCarrito: number;
  cantidad: number;
}
export interface Compra {
  idCompra: number;
  idUsuario: number;
  idDireccion: number;
  fecha: Date;
  total: number;
  estado: "pendiente" | "enviado" | "entregado" | "cancelado";
  idCarrito: number;
}
