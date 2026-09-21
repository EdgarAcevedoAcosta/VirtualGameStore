export class ErrorProducto extends Error {
  constructor(Productoid: number) {
    super(`Producto con ID ${Productoid} no encontrado`);
  }
}
export class ErrorUsuario extends Error {
  constructor(usuarioId: number) {
    super(`Usuario con ID ${usuarioId} no encontrado`);
  }
}
export class ErrorCompra extends Error {
  constructor(compraId: number) {
    super(`Compra con ID ${compraId} no encontrada`);
  }
}
export class ErrorCategoria extends Error {
  constructor(categoriaId: number) {
    super(`Categoria con ID ${categoriaId} no encontrada`);
  }
}
export class ErrorCarrito extends Error {
  constructor(carritoId: number) {
    super(`Carrito con ID ${carritoId} no encontrado`);
  }
}
export class ErrorOrden extends Error {
  constructor(ordenId: number) {
    super(`Orden con ID ${ordenId} no encontrada`);
  }
}
export class ErrorAutenticacion extends Error {
  constructor() {
    super(`Error de autenticación: credenciales inválidas`);
  }
}
export class ErrorAutorizacion extends Error {
  constructor() {
    super(`Error de autorización: acceso denegado`);
  }
}
export class ErrorValidacion extends Error {
  constructor(mensaje: string) {
    super(`Error de validación: ${mensaje}`);
  }
}
export class ErrorServidor extends Error {
  constructor() {
    super(`Error del servidor: algo salió mal`);
  }
}
export class ErrorConexion extends Error {
  constructor() {
    super(`Error de conexión: no se pudo conectar al servidor`);
  }
}
export class ErrorContraseña extends Error {
  constructor() {
    super(`Error de contraseña: la contraseña es incorrecta`);
  }
}
export class ErrorAutoridad extends Error {
  constructor() {
    super(`Error de autoridad: no tienes permisos para realizar esta acción`);
  }
}
export class ErrorCarritoVacio extends Error {
  constructor() {
    super(`Error no tienes Productos en el Carrito por lo que no puedes hacer la compra`);
  }
}
export class ErrorProductoInactivo extends Error {
  constructor() {
    super(`El producto no se pude Comprar por que no esta disponible`);
  }
}
export class ErrorProductoCantidad extends Error {
  constructor() {
    super(`Error no hay cantidad suficiente para hacer esta compra`);
  }
}
