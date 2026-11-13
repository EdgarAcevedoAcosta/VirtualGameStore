import { useEffect, useState } from "react";
import type { Carrito } from "../Tipos";
import { mensajeDeError } from "../servicios/api";
import { traerMiCarrito } from "../servicios/carritos/GETCarritos";

export function useMiCarrito() {
  const [carrito, setCarrito] = useState<Carrito>();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);
  useEffect(() => {
    let vigente = true;
    traerMiCarrito()
      .then((lista) => {
        if (vigente) setCarrito(lista);
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
  return { carrito, cargando, error, reintentar };
}
