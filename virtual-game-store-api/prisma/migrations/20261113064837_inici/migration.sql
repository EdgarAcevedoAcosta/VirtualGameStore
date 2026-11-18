-- CreateTable
CREATE TABLE `categorias` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(160) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `imagenUrl` VARCHAR(200) NOT NULL,
    `estado` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(160) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rol` VARCHAR(10) NOT NULL DEFAULT 'cliente',
    `activo` VARCHAR(7) NOT NULL,

    UNIQUE INDEX `usuarios_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direcciones` (
    `idDireccion` INTEGER NOT NULL AUTO_INCREMENT,
    `calle` VARCHAR(50) NOT NULL,
    `ciudad` VARCHAR(50) NOT NULL,
    `codigoPostal` VARCHAR(5) NOT NULL,
    `pais` VARCHAR(50) NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    INDEX `direcciones_idUsuario_idx`(`idUsuario`),
    PRIMARY KEY (`idDireccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compras` (
    `idCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idDireccion` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `estado` VARCHAR(10) NOT NULL,
    `idCarrito` INTEGER NOT NULL,

    INDEX `compras_idUsuario_idDireccion_idCarrito_idx`(`idUsuario`, `idDireccion`, `idCarrito`),
    PRIMARY KEY (`idCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productoCarritos` (
    `idProductoCarrito` INTEGER NOT NULL AUTO_INCREMENT,
    `idCarrito` INTEGER NULL,
    `idProducto` INTEGER NULL,
    `cantidad` INTEGER NOT NULL,

    INDEX `productoCarritos_idProducto_idCarrito_idx`(`idProducto`, `idCarrito`),
    PRIMARY KEY (`idProductoCarrito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carritoCompras` (
    `idCarrito` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,

    INDEX `carritoCompras_idUsuario_idx`(`idUsuario`),
    PRIMARY KEY (`idCarrito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoriaToProducto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToProducto_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToProducto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `direcciones` ADD CONSTRAINT `direcciones_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_idDireccion_fkey` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones`(`idDireccion`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_idCarrito_fkey` FOREIGN KEY (`idCarrito`) REFERENCES `carritoCompras`(`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productoCarritos` ADD CONSTRAINT `productoCarritos_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `productos`(`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productoCarritos` ADD CONSTRAINT `productoCarritos_idCarrito_fkey` FOREIGN KEY (`idCarrito`) REFERENCES `carritoCompras`(`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carritoCompras` ADD CONSTRAINT `carritoCompras_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToProducto` ADD CONSTRAINT `_CategoriaToProducto_A_fkey` FOREIGN KEY (`A`) REFERENCES `categorias`(`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToProducto` ADD CONSTRAINT `_CategoriaToProducto_B_fkey` FOREIGN KEY (`B`) REFERENCES `productos`(`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;
