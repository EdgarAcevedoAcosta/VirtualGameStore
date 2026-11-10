import { useEffect, useState } from "react";
import type { Categoria } from "../Tipos";
import { mensajeDeError } from "../servicios/api";
import { traerCategorias } from "../servicios/Categorias";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intentando, setIntentando] = useState(0);

  useEffect(() => {
    let agotado = false;
    traerCategorias()
      .then((categorias) => {
        if (!agotado) {
          setCategorias(categorias);
        }
      })
      .catch((e) => {
        if (!agotado)
          setError(mensajeDeError(e, "Error no se pudo obtener los datos de las categorias."));
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
  return { categorias, cargando, error, reintentar };
}
