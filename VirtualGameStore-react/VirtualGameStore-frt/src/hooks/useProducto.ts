import { useEffect, useState } from "react";
import type { Producto } from "../Tipos";
import { traerVideojuego } from "../servicios/productos/GETProductos";
import { mensajeDeError } from "../servicios/api";

export function useProducto(id: number) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intentando, setIntentando] = useState(0);

  useEffect(() => {
    let agotado = false;
    traerVideojuego(id)
      .then((producto) => {
        if (!agotado) {
          setProducto(producto);
        }
      })
      .catch((e) => {
        if (!agotado)
          setError(mensajeDeError(e, "Error no se pudo obtener los datos del Producto."));
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
  return { producto, cargando, error, reintentar };
}
