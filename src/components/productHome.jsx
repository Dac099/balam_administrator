import { useState } from "react";
import { useImageStorage } from "../hooks/useImageStorage";
import { supabase } from "../supabase/client";

export const ProductHome = ({product}) => {
  const [ name, setName ] = useState(product.name);
  const [ previewImg, setPreviewImg ] = useState(product.url_image);
  const [ imageSelected, setImageSelected ] = useState(null);
  const { uploadImage } = useImageStorage();
  const [ onEdit, setOnEdit ] = useState(false);

  const getImagePreview = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewImg(e.target.result);
    }
    
    reader.readAsDataURL(file);
  }

  const handleUpload = async(e) => {
    e.preventDefault();
    const newProductData = {};
    const fileType = product.path_image.split('.')[1];
    
    if(name !== product.name){
      const newImgPath = `cards/${name}.${fileType}`;

      const { error: copyError } = await supabase
      .storage
      .from('home_page')
      .copy(product.path_image, newImgPath);

      if(copyError) console.log(copyError);

      const { data: {publicURL} } = supabase
      .storage
      .from('home_page')
      .getPublicUrl(newImgPath);

      const { error: onDeleteError } = await supabase
      .storage
      .from('home_page')
      .remove(product.path_image);

      if(onDeleteError) console.log(onDeleteError);

      newProductData.url_image = publicURL;
      newProductData.path_image = newImgPath;
      newProductData.name = name;
    }

    if(imageSelected){
      const { error: deleteError } = await supabase
      .storage
      .from('home_page')
      .remove([product.path_image]);

      if(deleteError) console.log(deleteError);

      const { error: uploadError } = await supabase
      .storage
      .from('home_page')
      .upload(product.path_image, imageSelected, {
        cacheControl: 0,
        upsert: true
      });

      if(updateError) console.log(uploadError);

      const { data: {publicURL} } = supabase.storage.from('home_page').getPublicUrl(product.path_image);

      newProductData.url_image = publicURL;
      newProductData.path_image = product.path_image;

    }

    const { error: updateError } = await supabase
    .from('cards')
    .update(newProductData)
    .eq('id', product.id);

    if(updateError) console.log(updateError);

    setOnEdit(false);
  } 

  return (
    <article className={'min-w-[264px] max-w-sm rounded-sm'}>

      <img 
        src={previewImg}
        alt={product.name} 
      />

      <form 
        className={`p-2 ${onEdit ? 'bg-violet-200 text-violet-900' : 'bg-neutral-200'}`}
        onSubmit={e => handleUpload(e)}
      >
        <div className="flex flex-col mb-4">
          <label 
            htmlFor="name"
            className="font-semibold text-xl"
          >
            Nombre:
          </label>

          <input 
            className={`h-10 px-2 rounded-md border-2 text-black ${onEdit ? 'bg-violet-50' : 'bg-neutral-300'}`}
            type="text" 
            name="name" 
            id="name" 
            onChange={e => setName(e.target.value)}
            value={name}    
            disabled={!onEdit}  
            />
        </div>

        <div className="flex flex-col mb-4">
          <label 
            htmlFor="image"
            className="font-semibold text-xl"
            >
            Imágen:
          </label>

          <input 
            accept="image/png, image/jpg, image/jpeg"      
            className={`h-12 px-2 rounded-md border-2 p-2 ${onEdit ? 'bg-violet-50' : 'bg-neutral-300'}`}
            type="file" 
            name="image" 
            id="image" 
            onChange={e => {
              getImagePreview(e.target.files[0]);
              setImageSelected(e.target.files[0]);
            }}
            disabled={!onEdit}
          />
        </div>

        <section className={`grid grid-cols-2`}>
          {onEdit 
            ?
            <button 
              type="button"
              className="hover:bg-violet-950 hover:text-violet-50 font-semibold text-violet-900 h-10 text-sm"
              onClick={() => setOnEdit(false)}
            >
              Cancelar
            </button>

            :
            <button 
              type="button"
              className="hover:bg-violet-950 hover:text-violet-50 font-semibold text-violet-900 h-10 text-sm"
              onClick={() => setOnEdit(true)}
            >
              Cambiar
            </button>
          }

          <button 
            type="submit"
            className={`hover:bg-violet-950 hover:text-violet-50 font-semibold text-violet-900 h-10 text-sm ${!onEdit ? 'text-neutral-400 hover:bg-neutral-200 hover:text-neutral-400' : ''} `}
            disabled={!onEdit}
          >
            Guardar
          </button>
        </section>

      </form>
    </article>
  );
}