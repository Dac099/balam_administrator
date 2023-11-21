import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export const Products = () => {
  const [products, setProducts] = useState(useLoaderData());

  return (
    <section className="pr-2">
      <section className="flex justify-between">
        <p className="text-center text-2xl font-semibold">Tus productos</p>

        <section>
          <Link
            to={'/productos/nuevo'}
          >
            <FaPlus  className="text-indigo-600"/>
          </Link>
        </section>
      </section>

      <section className={products.lenght > 0 ? 'border-2' : ''}>
        
      </section>
    </section>
  );
}
