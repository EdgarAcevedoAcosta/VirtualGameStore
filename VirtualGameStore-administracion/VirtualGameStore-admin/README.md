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

| Rol     | Descripción                                   |
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

## Casos De Uso por Entidad

# Productos

| Caso de Uso | Pantalla que lo Resuelve |
| ----------------------------- | ------------------------------------------------------------- |
| Ver el Listado de Productos | `/productos` Aqui esta la Lista de Productos hecha con Targetas de Producto |
| Crear Producto | Formulario de Producto |
| Editar Producto | Formulario de Producto |
| Eliminar Produto | No Tiene Pantalla si no que es un Aviso de Confirmación |
| Filtrar por Categoria | Esta como Componente llamdado FiltroCategorias |
| Filtrar por nombre | Es un input text Arriba del Filtro |

# Categorias

| Caso de Uso | Pantalla que lo Resuelve |
| ----------------------------- | ------------------------------------------------------------- |
| Ver el Listado de Categorias | `/categorias` Aqui esta la Lista de Categorías hecha con Targetas de Categoria |
| Crear Categoría | Formulario de Categoría |
| Editar Categoría | Formulario de Categoría |
| Eliminar Categorias | No Tiene Pantalla si no que es un Aviso de Confirmación |
| Filtrar por nombre | Es un input text Arriba del Filtro |

# Usuarios

| Caso de Uso | Pantalla que lo Resuelve |
| ----------------------------- | ------------------------------------------------------------- |
| Ver el Listado de Usuarios | `/usuarios` Aqui esta la Lista de Usuarios hecha con Targetas de Usuario |
| Crear Usuarios | Formulario de Usuario |
| Editar Usuarios | Formulario de Usuario |
| Eliminar Usuario | No Tiene Pantalla si no que es un Aviso de Confirmación |
| Filtrar por nombre | Es un input text Arriba del Filtro |

# Direcciones

| Caso de Uso | Pantalla que lo Resuelve |
| ----------------------------- | ------------------------------------------------------------- |
| Ver el Listado de Direcciones | `/direcciones` Aqui esta la Lista de Direcciones hecha con Targetas de Dirección |
| Crear Dirección | Formulario de Dirección |
| Editar Dirección | Formulario de Dirección |
| Eliminar Dirección | No Tiene Pantalla si no que es un Aviso de Confirmación |

# Compras

| Caso de Uso | Pantalla que lo Resuelve |
| ----------------------------- | ------------------------------------------------------------- |
| Ver el Listado de Compras | `/compras` Aqui esta la Lista de Compras hecha con Targetas de Compra |
| Crear Compra | Formulario de Compra |
| Editar Compra | Formulario de Compra |
| Eliminar Compra | No Tiene Pantalla si no que es un Aviso de Confirmación |

## Tipo de Pantalla

| Tipo de Pantalla          | Que Pide                                                   | Entidades que lo Usan |
| ------------------------- | ---------------------------------------------------------- | --------------------- |
| Pantalla para ver Listado | Estar Loggeado con el Rol que Tiene el Administrador       | Todas                 |
| Pantalla de Formulario    | Datos Importantes para Crearla / Lo que Quieras Actualizar | Todas                 |
| Login                     | Tu Correo y Contraseña                                     |

## Rutas (Nota: Todas a Excepción de DELETE todas muestran su Pantalla Especifica)

# Productos

| La Ruta                 | Quién | Que Hace                                                      |
| ----------------------- | ----- | ------------------------------------------------------------- |
| `/productos`            | admin | Regresa Todos los Productos Dentro de la API o Guardados      |
| `/productos/:id/editar` | admin | Actualiza los Datos del Producto que se Quiere Actualizar     |
| `/productos/nuevo`      | admin | Crea un Producto Segun las Especificaciones del Administrador |
| `/productos/:id`        | admin | Elimina el Producto que el Administrador eligio               |

# Direcciones

| Método y ruta             | Quién | Que Hace                                                        |
| ------------------------- | ----- | --------------------------------------------------------------- |
| `/direcciones`            | admin | Regresa Todas las Direcciones de la API o Guardadas             |
| `/direcciones/:id/editar` | admin | Actualiza los Datos de la Dirección que se Quiere Actualizar    |
| `/direcciones/nuevo`      | admin | Crea una Dirección Segun las Especificaciones del Administrador |
| `/direcciones/:id`        | admin | Elimina una Dirección que el Administrador eligio               |

# Usuarios

| Método y ruta          | Quién | Que Hace                                                     |
| ---------------------- | ----- | ------------------------------------------------------------ |
| `/usuarios`            | admin | Regresa Todos los Usuarios registrados                       |
| `/usuarios/:id/editar` | admin | Actualiza los Datos de la Usuaurio que se Quiere Actualizar  |
| `/usuarios/nuevo`      | admin | Crea un Usuario Segun las Especificaciones del Administrador |
| `/usuarios/:id`        | admin | Elimina un Usuario que el Administrador eligio               |

# Compras

| Método y ruta         | Quién | Que Hace                                                     |
| --------------------- | ----- | ------------------------------------------------------------ |
| `/compras`            | admin | Regresa Todas los Compras registradas                        |
| `/compras/:id/editar` | admin | Actualiza los Datos de la Compra que se Quiere Actualizar    |
| `/compras/nuevo`      | admin | Crea una Compra Segun las Especificaciones del Administrador |
| `/compras/:id`        | admin | Elimina una Compra que el Administrador eligio               |

# Categorias

| Método y ruta            | Quién | Que Hace                                                        |
| ------------------------ | ----- | --------------------------------------------------------------- |
| `/categorias`            | admin | Regresa Todas los Categorias registradas                        |
| `/categorias/:id/editar` | admin | Actualiza los Datos de la Categoria que se Quiere Actualizar    |
| `/categorias/nuevo`      | admin | Crea una Categoria Segun las Especificaciones del Administrador |
| `/categorias/:id`        | admin | Elimina una Categoria que el Administrador eligio               |

# Login

| Método y ruta | Quién      | Que Hace                                |
| ------------- | ---------- | --------------------------------------- |
| `/login`      | Cualquiera | Entra a una Pantalla para Inciar Sesión |

## Botones Importantes

| Cual            | Que hace                                                             |
| --------------- | -------------------------------------------------------------------- |
| Editar          | Edita el Elemento que Quieras Modificar                              |
| icono de basura | Borra el Elemento que Quieras Borrar con una pregunta para confirmar |
| Cerrar Sesión   | Cierra la Sesión del Administrador Loggeado                          |

# VirtualGameStoreAdmin

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## Como Iniciar La Pagina de Administrador

En la Terminal Poner el Comando

```bash
ng serve
```

Una vez que corra el Comando Entrar al Navegador y Poner `http://localhost:4200/`. La Aplicación te Mandara a la Pantalla de Inicio de Sesión donde colocaras el correo y la contraseña.

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
