import { Outlet } from "react-router";
import { Encabezado } from "./Encabezado";

export function Layout() {
  return (
    <div className="disposicion">
      <Encabezado />
      <main className="disposicion__contenido">
        <Outlet />
      </main>
    </div>
  );
}
