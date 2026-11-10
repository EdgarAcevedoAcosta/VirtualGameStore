import { lazy } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "./componentes/Layout";
import { NoEncontrado } from "./componentes/NoEncontrado";
import { RutaProtegida } from "./componentes/RutaProtegida";

const PaginaCategorias = lazy(() => import("./paginas/PaginaCategoria"));
const PaginaRegistrarDireccion = lazy(() => import("./paginas/PaginaRegistrarDireccion"));
const PaginaDirecciones = lazy(() => import("./paginas/PaginaDireccion"));
const PaginaProducto = lazy(() => import("./paginas/PaginaProducto"));
const PaginaMenu = lazy(() => import("./paginas/PaginaMenu"));
const PaginaRegistro = lazy(() => import("./paginas/PaginaRegistro"));
const PaginaLogin = lazy(() => import("./paginas/PaginaLogin"));
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/productos" replace />}></Route>
          <Route path="/productos">
            <Route index element={<PaginaMenu />}></Route>
            <Route path=":id" element={<PaginaProducto />}></Route>
          </Route>
          <Route path="entrar" element={<PaginaLogin />}></Route>
          <Route path="registro" element={<PaginaRegistro />}></Route>
          <Route path="catalogo-categorias" element={<PaginaCategorias />}></Route>
          <Route element={<RutaProtegida />}>
            <Route path="mis-direcciones" element={<PaginaDirecciones />}></Route>
            <Route path="registrar-direccion" element={<PaginaRegistrarDireccion />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NoEncontrado />}></Route>
      </Routes>
    </>
  );
}

export default App;
