import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "./componentes/Layout";
import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";
import { NoEncontrado } from "./componentes/NoEncontrado";
import PaginaMenu from "./paginas/PaginaMenu";
import PaginaProducto from "./paginas/PaginaProducto";

function App() {
  const [count, setCount] = useState(0);

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
        </Route>
        <Route path="*" element={<NoEncontrado />}></Route>
      </Routes>
    </>
  );
}

export default App;
