import { create } from "zustand";
import type { Direccion } from "../Tipos";
import { traerMisDirecciones } from "../servicios/Videojuegos";
import { mensajeDeError } from "../servicios/api";

interface EstadoDireccion {
  lista: Direccion[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}
export const useDirecciones = create<EstadoDireccion>()((set) => ({
  lista: [],
  cargando: true,
  error: null,
  cargar: async () => {
    set({ cargando: true, error: null });
    try {
      set({ lista: await traerMisDirecciones() });
    } catch (error) {
      set({ error: mensajeDeError(error, "No se pudieron cargar tus direcciones") });
    } finally {
      set({ cargando: false });
    }
  },
  vaciar: () => set({ lista: [], cargando: false, error: null }),
}));
