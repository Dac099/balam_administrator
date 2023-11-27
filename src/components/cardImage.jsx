import { useState } from "react";
import { supabase } from "../supabase/client";

export const CardImage = ({image}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleChangeImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImageURL(e.target.result);
    }
  }

  const handleUpload = async() => {
    if(!selectedImage){
      alert('Necesitas seleccionar un archivo');
      return;
    }

    const { error: errorDelete } = await supabase
    .storage
    .from('home_page')
    .remove([image.path]);

    if(errorDelete) console.log(errorDelete);

    const { error: errorUpload } = await supabase
    .storage
    .from('home_page')
    .upload(image.path, selectedImage, {
      cacheControl: 0,
      upsert: true
    })

    if(errorUpload) console.log(errorUpload);
    setOnEdit(false);
  }

  return (
    <article className="border-2 min-w-[260px] max-w-sm w-full relative">
      <img 
        src={imageURL || image.publicURL} 
        className=" h-5/6 w-full object-cover"
      />

      <section className={`h-1/6 bg-violet-200 text-violet-950 font-semibold ${onEdit ? 'grid grid-cols-2 items-center' : ''}`}>

        <button
          type="button"
          className="hover:bg-violet-900 hover:text-violet-200 w-full h-full"
          onClick={() => setOnEdit(true)}
        >
          Cambiar
        </button>

        {onEdit &&       
          <button
            type="button"
            className="hover:bg-violet-900 hover:text-violet-200 w-full h-full"
            onClick={() => {
              setImageURL(null);
              setOnEdit(false);
            }}
          >
            Cancelar
          </button>
        }

      </section>

      {onEdit &&
        <section className="absolute top-0 left-0 bg-violet-950/80 w-full h-16 z-10 grid  grid-cols-2 place-content-center p-1">
          <input 
            type="file" 
            name="" 
            id="" 
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              handleChangeImage(e.target.files[0]);
            }}
          />
          
          <button 
            type="button"
            className="border-2 rounded-md bg-violet-200"
            onClick={handleUpload}
          >
            Subir
          </button>
        </section>

      }
    </article>
  );
}