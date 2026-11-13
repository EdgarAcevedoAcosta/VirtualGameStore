import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';

const u = new URL(process.env.DATABASE_URL!);
const adapter = new PrismaMariaDb({
  host: u.hostname,
  port: Number(u.port || 3306),
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  database: u.pathname.replace(/^\//, ''),
  allowPublicKeyRetrieval: true,
  // Solo al desplegar (Aiven pide SSL). En local, DB_SSL no existe.
  ...(process.env.DB_SSL === 'true'
    ? { ssl: { rejectUnauthorized: false } }
    : {}),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Orden inverso a las dependencias: primero lo que apunta, al final lo apuntado.
  await prisma.compra.deleteMany();
  await prisma.productoCarrito.deleteMany();
  await prisma.carritoCompra.deleteMany();
  await prisma.direccion.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();

  // Las 8 clases. La imagen la sirve esta misma API desde public/img.

  await prisma.categoria.createMany({
    data: [
      { nombre: 'Acción' },
      { nombre: 'RPG' },
      { nombre: 'Shooter' },
      { nombre: 'Deportes' },
      { nombre: 'Aventura' },
      { nombre: 'Indie' },
    ],
  });

  // =====================
  // PRODUCTOS
  // =====================

  await prisma.producto.createMany({
    data: [
      {
        nombre: 'The Legend of Zelda: Breath of the Wild',
        descripcion: 'Explora las Tierras  de mundo abierto.',
        precio: 69.99,
        stock: 50,
        imagenUrl: '/img/zelda-breath-of-the-wild.jpg',
        estado: 'activo',
      },
      {
        nombre: 'Super Mario Odyssey',
        descripcion: 'Explora las Tierras  de mundo abierto.',
        precio: 59.99,
        stock: 40,
        imagenUrl: '/img/super-mario-odyssey.jpg',
        estado: 'activo',
      },
      {
        nombre: 'Pokémon Legends: Arceus',
        descripcion: 'Explora las Tierras  de mundo abierto.',
        precio: 49.99,
        stock: 80,
        imagenUrl: 'pokemon-legends-arceus.jpg',
        estado: 'activo',
      },
      {
        nombre: 'Animal Crossing: New Horizons',
        descripcion: 'Explora las Tierras  de mundo abierto.',
        precio: 69.99,
        stock: 100,
        imagenUrl: '/img/animal-crossing-new-horizons.jpg',
        estado: 'activo',
      },
      {
        nombre: 'Mario Kart 8 Deluxe',
        descripcion: 'Acción frenética y multijugador competitivo.',
        precio: 69.99,
        stock: 45,
        imagenUrl: '/img/mario-kart-8-deluxe.jpg',
        estado: 'activo',
      },
    ],
  });

  // =====================
  // USUARIOS
  // =====================

  const adminPassword = await bcrypt.hash('admin123', 10);
  const juanPassword = await bcrypt.hash('juan123', 10);
  const mariaPassword = await bcrypt.hash('maria123', 10);

  await prisma.usuario.createMany({
    data: [
      {
        nombre: 'Administrador',
        correo: 'admin@gamestore.com',
        passwordHash: adminPassword,
        rol: 'admin',
        activo: 'activo',
      },
      {
        nombre: 'Juan Pérez',
        correo: 'juan@gmail.com',
        passwordHash: juanPassword,
        rol: 'cliente',
        activo: 'activo',
      },
      {
        nombre: 'Maria Juana',
        correo: 'maria@gmail.com',
        passwordHash: mariaPassword,
        rol: 'cliente',
        activo: 'activo',
      },
    ],
  });

  // =====================
  // DIRECCIONES
  // =====================
  await prisma.direccion.createMany({
    data: [
      {
        calle: 'Av. Morelos 120',
        ciudad: 'Ciudad Obregón',
        codigoPostal: '85000',
        pais: 'México',
        idUsuario: 2,
      },
      {
        calle: 'Blvd. Kino 455',
        ciudad: 'Hermosillo',
        codigoPostal: '83000',
        pais: 'México',
        idUsuario: 1,
      },
    ],
  });

  // =====================
  // CARRITOS
  // =====================
  await prisma.carritoCompra.createMany({
    data: [
      {
        idUsuario: 2,
        total: 129.98,
      },
      {
        idUsuario: 3,
        total: 94.98,
      },
    ],
  });

  // =====================
  // PRODUCTOS DEL CARRITO
  // =====================

  await prisma.productoCarrito.createMany({
    data: [
      {
        idCarrito: 1,
        idProducto: 1,
        cantidad: 1,
      },
      {
        idCarrito: 1,
        idProducto: 2,
        cantidad: 1,
      },
    ],
  });

  // =====================
  // COMPRAS
  // =====================

  await prisma.compra.createMany({
    data: [
      {
        idUsuario: 2,
        idDireccion: 1,
        idCarrito: 1,
        total: 129.98,
        estado: 'procesando',
      },
      {
        idUsuario: 3,
        idDireccion: 2,
        idCarrito: 2,
        total: 94.98,
        estado: 'enviandos',
      },
    ],
  });

  console.log(
    `Seed listo: ${await prisma.categoria.count()} categorias, ` +
      `${await prisma.producto.count()} productos, ` +
      `${await prisma.usuario.count()} usuarios, ` +
      `${await prisma.direccion.count()} direcciones.` +
      `${await prisma.carritoCompra.count()} carritos, ` +
      `${await prisma.compra.count()} compras.`,
  );
}

main()
  .catch((e) => {
    console.error('El seed fallo:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
