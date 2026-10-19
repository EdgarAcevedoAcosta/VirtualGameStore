-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(160) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `stock` INTEGER NULL,
    `imagenUrl` VARCHAR(200) NULL,
    `estado` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaProducto` (
    `idProducto` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`idProducto`, `idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(80) NOT NULL,
    `contrasena` VARCHAR(50) NOT NULL,
    `rol` VARCHAR(8) NOT NULL,
    `activo` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `idDireccion` INTEGER NOT NULL AUTO_INCREMENT,
    `calle` VARCHAR(50) NOT NULL,
    `ciudad` VARCHAR(50) NOT NULL,
    `codigoPostal` VARCHAR(5) NOT NULL,
    `pais` VARCHAR(50) NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    INDEX `Direccion_idUsuario_idx`(`idUsuario`),
    PRIMARY KEY (`idDireccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `idCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idDireccion` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `estado` VARCHAR(10) NOT NULL,
    `idCarrito` INTEGER NOT NULL,

    INDEX `Compra_idUsuario_idDireccion_idCarrito_idx`(`idUsuario`, `idDireccion`, `idCarrito`),
    PRIMARY KEY (`idCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoCarrito` (
    `idProductoCarrito` INTEGER NOT NULL AUTO_INCREMENT,
    `idCarrito` INTEGER NULL,
    `idProducto` INTEGER NULL,
    `cantidad` INTEGER NOT NULL,

    INDEX `ProductoCarrito_idProducto_idCarrito_idx`(`idProducto`, `idCarrito`),
    PRIMARY KEY (`idProductoCarrito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarritoCompra` (
    `idCarrito` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NULL,
    `total` DOUBLE NOT NULL,

    INDEX `CarritoCompra_idUsuario_idx`(`idUsuario`),
    PRIMARY KEY (`idCarrito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriaProducto` ADD CONSTRAINT `CategoriaProducto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaProducto` ADD CONSTRAINT `CategoriaProducto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_idDireccion_fkey` FOREIGN KEY (`idDireccion`) REFERENCES `Direccion`(`idDireccion`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_idCarrito_fkey` FOREIGN KEY (`idCarrito`) REFERENCES `CarritoCompra`(`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoCarrito` ADD CONSTRAINT `ProductoCarrito_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoCarrito` ADD CONSTRAINT `ProductoCarrito_idCarrito_fkey` FOREIGN KEY (`idCarrito`) REFERENCES `CarritoCompra`(`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoCompra` ADD CONSTRAINT `CarritoCompra_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
