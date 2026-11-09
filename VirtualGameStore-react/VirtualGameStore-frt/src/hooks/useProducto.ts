import { useState } from "react";
import type { Producto } from "../Tipos";

export function useProducto(id: number) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
}
