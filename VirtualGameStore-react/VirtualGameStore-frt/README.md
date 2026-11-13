
## Cómo correrlo

```bash
npm install
npm run dev
```
## Rutas

| Método y ruta | Quién | Qué regresa |
|---|---|---|
| `GET /clases` | cualquiera | Las 8 clases, con `categoria`, `descripcion`, `duracionMin` e `imagen` |
| `GET /clases/:id` | cualquiera | La clase **con sus horarios**, y en cada uno los lugares `disponibles` |
| `GET /img/clase-01.jpg` | cualquiera | La imagen de la clase (archivo estático) |
| `POST /auth/registro` | cualquiera | `{ nombre, correo, password }` → crea el miembro y su cuenta, y regresa el token |
| `POST /auth/login` | cualquiera | `{ correo, password }` → `{ access_token, usuario: { correo, nombre, rol } }` |
| `GET /auth/yo` | con token | Lo que viene dentro del token |
| `GET /inscripciones/mias` | con token | Las inscripciones de quien viene en el token, con su clase y horario |
| `POST /inscripciones` | con token | `{ horarioId }` → 201. El miembro sale del token |
| `GET /inscripciones` | entrenador o admin | Todas |
| `DELETE /inscripciones/:id` | entrenador o admin | Cancela |

Toda respuesta exitosa viene en el sobre de la Práctica 9B: `{ data, meta }`.

### Los errores que va a ver el frontend

| Código | Cuándo | `message` |
|---|---|---|
| 400 | Registro con datos malos | Un arreglo, uno por regla: `["el nombre es obligatorio", …]` |
| 401 | Login con contraseña equivocada | `Credenciales inválidas` |
| 401 | Ruta protegida sin token, o con el token vencido | `Unauthorized` |
| 403 | La cuenta no es de un miembro (entrenador o admin queriendo inscribirse) | `Tu cuenta no es de un miembro del gimnasio` |
| 404 | `GET /clases/99` | `No existe la clase 99` |
| 409 | Inscribirse dos veces al mismo horario | `Ya estás inscrito en este horario` |
| 409 | El horario ya no tiene lugares (prueba el 3) | `Este horario ya está lleno (cupo de 1)` |
| 409 | Registrarse con un correo que ya existe | `Ese correo ya está registrado` |

`peticiones.http` tiene todas, listas para la extensión REST Client de VS Code.

---


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
