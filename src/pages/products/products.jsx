import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState(useLoaderData());

  return (
    <section>
      <p className="text-center text-2xl font-semibold">Tus productos</p>

      <section>
        <Link
          to={'/productos/nuevo'}
        >
          Agregar producto
        </Link>
      </section>

      <section className={products.lenght > 0 ? 'border-2' : ''}>
        
      </section>
    </section>
  );
}
