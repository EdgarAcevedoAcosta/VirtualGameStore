import { Outlet } from "react-router";
import { Encabezado } from "./Encabezado";
import { Suspense } from "react";
import { Cargando } from "./Cargando";

export function Layout() {
  return (
    <div className="disposicion">
      <Encabezado />
      <main className="disposicion__contenido">
        <Suspense fallback={<Cargando />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
