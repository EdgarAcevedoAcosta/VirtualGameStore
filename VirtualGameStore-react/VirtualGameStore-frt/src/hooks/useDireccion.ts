import { useEffect, useState } from "react";
import type { Direccion } from "../Tipos";
import { traerDireccion } from "../servicios/direcciones/GETDirecciones";
import { mensajeDeError } from "../servicios/api";

export function useDireccion(id: number) {
  const [direccion, setDireccion] = useState<Direccion | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intentando, setIntentando] = useState(0);

  useEffect(() => {
    let vigente = false;
    traerDireccion(id)
      .then((direccion) => {
        if (!vigente) {
          setDireccion(direccion);
        }
      })
      .catch((e) => {
        if (!vigente)
          setError(mensajeDeError(e, "Error no se pudo obtener los datos de la dirección."));
      })
      .finally(() => {
        if (!vigente) setCargando(false);
      });
    return () => {
      vigente = true;
    };
  }, [intentando]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntentando((n) => n + 1);
  }
  return { direccion, cargando, error, reintentar };
}
