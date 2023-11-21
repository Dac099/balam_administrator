import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ProductCard } from "../../components/productCard";

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

      <section className={products.length > 0 ? 'rounded-md mt-4 flex flex-wrap gap-2 max-sm:justify-center' : ''}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))
        }
      </section>
    </section>
  );
}
