interface ContenidoProps {
  nombre: string;
  imagenUrl: string;
}

export function CategoriaProducto({ nombre, imagenUrl }: ContenidoProps) {
  return (
    <div className="tarjeta-corta-categoria">
      <img className="tarjeta-corta-categoria__imagen" src={imagenUrl} alt={nombre} />
      <span className="tarjeta-corta-categoria__titulo">{nombre}</span>
    </div>
  );
}
