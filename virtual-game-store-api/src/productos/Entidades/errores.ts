export abstract class ErrorDeDominio extends Error {}

export class ProductoNoEncontradoError extends ErrorDeDominio {
  constructor(idProducto: number) {
    super(`No existe el Producto: ${idProducto}`);
  }
}

export class CategoriaNoEncontradaError extends ErrorDeDominio {
  constructor(idCategoria: number) {
    super(`No existe la Categoria: ${idCategoria}`);
  }
}

export class SinStockProductoError extends ErrorDeDominio {
  constructor(idProducto: number, stock: number) {
    super(`Este Producto ya no esta disponible: ${idProducto}`);
    void stock;
  }
}

export class ProductoDuplicadoError extends ErrorDeDominio {
  constructor(idProducto: number) {
    super(`Ya existe este Producto`);
    void idProducto;
  }
}
