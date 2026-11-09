import { useEffect, useState } from "react";
import type { Producto } from "../Tipos";
import { traerVideojuegos } from "../servicios/Videojuegos";
import { mensajeDeError } from "../servicios/api";

export function useProductos(id: number) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intentando, setIntentando] = useState(0);

  useEffect(() => {
    let agotado = false;
    traerVideojuegos()
      .then((productos) => {
        if (!agotado) {
          setProductos(productos);
        }
      })
      .catch((e) => {
        if (!agotado)
          setError(mensajeDeError(e, "Error no se pudo obtener los datos de los Productos."));
      })
      .finally(() => {
        if (!agotado) setCargando(false);
      });
    return () => {
      agotado = true;
    };
  }, [intentando]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntentando((n) => n + 1);
  }
  return { productos, cargando, error, reintentar };
}
