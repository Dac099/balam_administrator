import { useLoaderData } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useState, useEffect } from "react";
import { CardImage } from "../../components/cardImage";
import { ProductHome } from "../../components/productHome";

export const Images = () => {
  const { banner_imgs, empresa_imgs, cards_data } = useLoaderData();
  const [ bannerURLs, setBannerURLs ] = useState([]);
  const [ empresaURLs, setEmpresaURLs ] = useState([]);

  useEffect(() => {
    setBannerURLs(banner_imgs.data.map(img => ({
      publicURL: supabase.storage.from('home_page').getPublicUrl(`banner/${img.name}`).data.publicUrl,
      path: `banner/${img.name}`
    })));
  
    setEmpresaURLs(empresa_imgs.data.map(img => ({
      publicURL: supabase.storage.from('home_page').getPublicUrl(`empresa/${img.name}`).data.publicUrl,
      path: `empresa/${img.name}`
    })));

  }, []);

  return (
    <section className="pr-2">
      <p className="text-2xl font-semibold mb-2">Imágenes que se muestran en el Inicio</p>
      <hr />

      <section className="mb-4">
        <p 
          className="font-semibold text-lg my-2 text-pink-500"
        >
          Imágenes del carrucel
        </p>

        <section className="grid grid-flow-col-dense grid-rows-1 gap-2 overflow-auto pb-4">
          {bannerURLs.length > 0 &&
            bannerURLs.map(image => <CardImage key={image.path} image={image}/>)
          }
        </section>
      </section>

      <hr />

      <section className="mb-8">
        <p 
          className="font-semibold text-lg my-2 text-pink-500"
        >
          Imágenes de misión y visión
        </p>

        <section className="flex flex-wrap justify-center gap-2">
          {empresaURLs.length > 0 &&
            empresaURLs.map(image => <CardImage key={image.path} image={image}/>)
          }
        </section>
      </section>

      <hr />

      <section className="mb-8">
        <p 
          className="font-semibold text-lg my-2 text-pink-500"
        >
          Productos a mostrar
        </p>

        <section className="flex flex-wrap gap-2 justify-center">         
          {cards_data.length > 0 &&
            cards_data.map(card => <ProductHome key={card.id} product={card}/>)
          }
        </section>

      </section>
    </section>
  );
}