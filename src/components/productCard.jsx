import { Link, Form } from "react-router-dom";
import { useState } from "react";

export const ProductCard = ({product}) => {
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);

  return (
    <article className="border-2 border-violet-400 rounded-md w-72">
      <section className="bg-violet-200/30 p-1 rounded-md">
        <img 
          src={product.url_img} 
          alt={product.name} 
          className="rounded-lg"
        />

        <p className="text-center font-semibold text-lg text-violet-950">{product.name}</p>

        <p className="text-sm text-neutral-500 text-justify px-2 my-3 h-16 text-ellipsis">{product.description}</p>

        <p className="text-right font-bold text-pink-700 text-lg">${product.price}</p>
      </section>

      <section className="grid grid-cols-2 p-1 bg-violet-400 rounded-bl-sm rounded-br-sm">
        <button 
          className="w-full h-10 grid place-content-center font-bold text-violet-100 rounded-md hover:text-violet-400 hover:bg-violet-100"
          onClick={() => setShowDeleteModal(true)}
        >
          Eliminar
        </button>

        <Link 
          className="w-full h-10 grid place-content-center font-bold text-violet-100 rounded-md hover:text-violet-400 hover:bg-violet-100"
          to={`productos/${product.id}/editar`}
        >
          Editar
        </Link>
      </section>

      {showDeleteModal &&
        <article className="absolute top-0 left-0 bg-black/40 w-screen h-screen grid place-content-center">
          <article className="w-[300px] bg-neutral-100 p-2 rounded-md">
            <p
              className="text-center text-xl"
            >
              ¿Seguro que quieres eliminar <span className="text-pink-400 font-bold">{product.name}</span>?
            </p>
            
            <section className="grid grid-cols-2 h-10 justify-center mt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="font-semibold text-sm text-violet-700 hover:bg-violet-200 rounded-md"
              >
                Cancelar
              </button>

              <Form
                method="post"
                action={`productos/${product.id}/eliminar`}
                className="grid place-content-center hover:bg-red-200 rounded-md"
              >
                <button 
                  type="submit"
                  className="font-semibold text-sm text-red-700"
                >
                  Eliminar
                </button>
              </Form>
            </section>

          </article>
        </article>
      }
    </article>
  );
}