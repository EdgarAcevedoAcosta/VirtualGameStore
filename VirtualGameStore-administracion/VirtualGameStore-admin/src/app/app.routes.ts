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
        path: 'produsctos/nuevo',
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
        title: 'Editar Clase - Admin',
      },
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'productos' },
];
