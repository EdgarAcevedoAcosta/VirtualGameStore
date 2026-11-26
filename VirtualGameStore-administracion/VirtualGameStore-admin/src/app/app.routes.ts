import { Routes } from '@angular/router';
import { soloAdmin } from './sesion/solo-admin';
import { Login } from './paginas/login/login';
import { Panel } from './paginas/panel/panel';
import { ListaProductos } from './paginas/lista-productos/lista-productos';
import { ListaCategorias } from './paginas/lista-categorias/lista-categorias';
import { ListaDirecciones } from './paginas/lista-direcciones/lista-direcciones';
import { ListaCompras } from './paginas/lista-compras/lista-compras';
import { ListaUsuarios } from './paginas/lista-usuarios/lista-usuarios';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Panel,
    canActivate: [soloAdmin],
    children: [
      { path: 'productos', component: ListaProductos, title: 'Productos - Admin' },
      { path: 'categorias', component: ListaCategorias, title: 'Categorias - Admin' },
      { path: 'direcciones', component: ListaDirecciones, title: 'Direcciones - Admin' },
      { path: 'compras', component: ListaCompras, title: 'Compras - Admin' },
      { path: 'usuarios', component: ListaUsuarios, title: 'Usuarios - Admin' },
      {
        path: 'productos/nuevo',
        loadComponent: () =>
          import('./paginas/formulario-producto/formulario-producto').then(
            (m) => m.FormularioProducto,
          ),
        title: 'Nuevo Producto - Admin',
      },
      {
        path: 'productos/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-producto/formulario-producto').then(
            (m) => m.FormularioProducto,
          ),
        title: 'Editar Producto - Admin',
      },
      {
        path: 'categorias/nuevo',
        loadComponent: () =>
          import('./paginas/formulario-categoria/formulario-categoria').then(
            (m) => m.FormularioCategoria,
          ),
        title: 'Nuevo Categoria - Admin',
      },
      {
        path: 'categorias/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-categoria/formulario-categoria').then(
            (m) => m.FormularioCategoria,
          ),
        title: 'Editar Categoria - Admin',
      },
      {
        path: 'usuarios/nuevo',
        loadComponent: () =>
          import('./paginas/formulario-usuario/formulario-usuario').then(
            (m) => m.FormularioUsuario,
          ),
        title: 'Nuevo Usuario - Admin',
      },
      {
        path: 'usuarios/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-usuario/formulario-usuario').then(
            (m) => m.FormularioUsuario,
          ),
        title: 'Editar Usuario - Admin',
      },
      {
        path: 'direcciones/nuevo',
        loadComponent: () =>
          import('./paginas/formulario-direccion/formulario-direccion').then(
            (m) => m.FormularioDireccion,
          ),
        title: 'Nueva Direccion - Admin',
      },
      {
        path: 'direcciones/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-direccion/formulario-direccion').then(
            (m) => m.FormularioDireccion,
          ),
        title: 'Editar Direccion - Admin',
      },
      {
        path: 'compras/nuevo',
        loadComponent: () =>
          import('./paginas/formulario-compra/formulario-compra').then((m) => m.FormularioCompra),
        title: 'Nuevo Compra - Admin',
      },
      {
        path: 'compras/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-compra/formulario-compra').then((m) => m.FormularioCompra),
        title: 'Editar Compra - Admin',
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
