import { useEffect, useState } from "react";
import type { Producto } from "../Tipos";
import { mensajeDeError } from "../servicios/api";
import { traerMiCarrito } from "../servicios/Videojuegos";

export function useMiCarrito() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);
  useEffect(() => {
    let vigente = true;
    traerMiCarrito()
      .then((lista) => {
        if (vigente) setProductos(lista);
      })
      .catch((e) => {
        if (vigente)
          setError(mensajeDeError(e, "No se pudieron cargar tus videojuegos en el carrito."));
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => {
      vigente = false;
    };
  }, [intento]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }
  return { productos, cargando, error, reintentar };
}
