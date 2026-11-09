// Son todos los tipos de entidades pero resumidas al tipo de
// informacion que va a extraer de cada una de ellas,
// para no tener que traer toda la informacion de cada entidad

export interface Usuario {
  correo: string;
  nombre: string;
  rol: "admin" | "cliente";
}

export interface Sesion {
  token: string;
  usuario: Usuario;
}
// las demas si llevan id
