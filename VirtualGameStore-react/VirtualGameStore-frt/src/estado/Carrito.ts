import { create } from "zustand";
import type { Producto } from "../Tipos";
import { mensajeDeError } from "../servicios/api";
import { traerMiCarrito } from "../servicios/Videojuegos";

interface EstadoCarrito {
  lista: Producto[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}
export const useVideojuegosC = create<EstadoCarrito>()((set) => ({
  lista: [],
  cargando: true,
  error: null,
  cargar: async () => {
    set({ cargando: true, error: null });
    try {
      set({ lista: await traerMiCarrito() });
    } catch (error) {
      set({ error: mensajeDeError(error, "No se pudieron cargar tus productos en el carrito") });
    } finally {
      set({ cargando: false });
    }
  },
  vaciar: () => set({ lista: [], cargando: false, error: null }),
}));
