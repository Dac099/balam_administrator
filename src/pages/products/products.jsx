import { useLoaderData } from "react-router-dom";

export const Products = () => {
  const products = useLoaderData();
  console.log(products)
  return (
    <section>
      Productos
    </section>
  );
}
