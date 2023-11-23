import { supabase } from "../supabase/client"

export const CardImage = ({image}) => {
  return (
    <article className="border-2 min-w-[260px] max-w-sm">
      <img 
        src={image.publicURL} 
      />

      <section className="h-10 grid grid-cols-2 bg-violet-200 text-violet-950 font-semibold ">

        <button 
          type="button"
          className="hover:bg-violet-900 hover:text-violet-200"
        >
          Eliminar
        </button>

        <button
          type="button"
          className="hover:bg-violet-900 hover:text-violet-200"
        >
          Cambiar
        </button>

      </section>
    </article>
  );
}