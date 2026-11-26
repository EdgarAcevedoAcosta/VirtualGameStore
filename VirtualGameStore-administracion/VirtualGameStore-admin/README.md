# Video:

https://youtu.be/fBnNqDTrlUA

Parte 2 del video

https://youtu.be/m8Ur-Dcy_oE

## Cuentas de prueba

El admin usa la contraseña **`admin123`**.

| Correo                | Rol     | contraseña |
| --------------------- | ------- | ---------- |
| `juan@gmail.com`      | cliente | juan123    |
| `admin@gamestore.com` | admin   | admin123   |
| `maria@gmail.com`     | cliente | maria123   |

## Que hace cada Rol

| Rol     | Descripci+on                                  |
| ------- | --------------------------------------------- |
| cliente | No tiene Acceso a la Pagina asi que nunguno   |
| admin   | Tiene el Permiso para la Gestión de la Tienda |

### Los errores que va a ver el frontend

| Código | Cuándo                                           | `message`                                                    |
| ------ | ------------------------------------------------ | ------------------------------------------------------------ |
| 400    | Registro con datos malos                         | Un arreglo, uno por regla: `["el nombre es obligatorio", …]` |
| 401    | Login con contraseña equivocada                  | `Credenciales inválidas`                                     |
| 401    | Ruta protegida sin token, o con el token vencido | `Unauthorized`                                               |
| 403    | La cuenta no es de un administrador              | `Tu cuenta no es de un administrador`                        |
| 404    | `GET /productos/99`                              | `No existe el produto 99`                                    |

## Botones Importantes

| Cual            | Que hace                                                             |
| --------------- | -------------------------------------------------------------------- |
| Editar          | Edita el Elemento que Quieras Modificar                              |
| icono de basura | Borra el Elemento que Quieras Borrar con una pregunta para confirmar |
| Cerrar Sesión   | Cierra la Sesión del Administrador Loggeado                          |

## Rutas (Nota: Todas a Excepción de DELETE todas muestran su Pantalla Especifica)

# Productos

| Método y ruta                 | Quién | Que Hace                                                      |
| ----------------------------- | ----- | ------------------------------------------------------------- |
| `GET /productos`              | admin | Regresa Todos los Productos Dentro de la API o Guardados      |
| `PATCH /productos/:id/editar` | admin | Actualiza los Datos del Producto que se Quiere Actualizar     |
| `POST /productos/nuevo`       | admin | Crea un Producto Segun las Especificaciones del Administrador |
| `DELETE /productos/:id`       | admin | Elimina el Producto que el Administrador eligio               |

# Direcciones

| Método y ruta                   | Quién | Que Hace                                                        |
| ------------------------------- | ----- | --------------------------------------------------------------- |
| `GET /direcciones`              | admin | Regresa Todas las Direcciones de la API o Guardadas             |
| `PATCH /direcciones/:id/editar` | admin | Actualiza los Datos de la Dirección que se Quiere Actualizar    |
| `POST /direcciones/nuevo`       | admin | Crea una Dirección Segun las Especificaciones del Administrador |
| `DELETE /direcciones/:id`       | admin | Elimina una Dirección que el Administrador eligio               |

# Usuarios

| Método y ruta                | Quién | Que Hace                                                     |
| ---------------------------- | ----- | ------------------------------------------------------------ |
| `GET /usuarios`              | admin | Regresa Todos los Usuarios registrados                       |
| `PATCH /usuarios/:id/editar` | admin | Actualiza los Datos de la Usuaurio que se Quiere Actualizar  |
| `POST /usuarios/nuevo`       | admin | Crea un Usuario Segun las Especificaciones del Administrador |
| `DELETE /usuarios/:id`       | admin | Elimina un Usuario que el Administrador eligio               |

# Compras

| Método y ruta               | Quién | Que Hace                                                     |
| --------------------------- | ----- | ------------------------------------------------------------ |
| `GET /compras`              | admin | Regresa Todas los Compras registradas                        |
| `PATCH /compras/:id/editar` | admin | Actualiza los Datos de la Compra que se Quiere Actualizar    |
| `POST /compras/nuevo`       | admin | Crea una Compra Segun las Especificaciones del Administrador |
| `DELETE /compras/:id`       | admin | Elimina una Compra que el Administrador eligio               |

# Categorias

| Método y ruta                  | Quién | Que Hace                                                        |
| ------------------------------ | ----- | --------------------------------------------------------------- |
| `GET /categorias`              | admin | Regresa Todas los Categorias registradas                        |
| `PATCH /categorias/:id/editar` | admin | Actualiza los Datos de la Categoria que se Quiere Actualizar    |
| `POST /categorias/nuevo`       | admin | Crea una Categoria Segun las Especificaciones del Administrador |
| `DELETE /categorias/:id`       | admin | Elimina una Categoria que el Administrador eligio               |

# Login

| Método y ruta | Quién      | Que Hace                                |
| ------------- | ---------- | --------------------------------------- |
| `/login`      | Cualquiera | Entra a una Pantalla para Inciar Sesión |

# VirtualGameStoreAdmin

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
