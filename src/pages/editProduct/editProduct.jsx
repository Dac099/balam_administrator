import { useProductTable } from "../../hooks/useProductTable";
import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

export const EditProduct = () => {
  const [product] = useLoaderData();
  const labelStyle = 'block font-semibold';
  const inputStyle = 'border-2 outline-pink-500 w-full h-10 rounded-md p-1';
  const { updateProduct } = useProductTable();
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ imagePreview, setImagePreview ] = useState(product.url_img || null);
  const [ name, setName ] = useState(product.name || '');
  const [ description, setDescription ] = useState(product.description || '');
  const [ price, setPrice ] = useState(product.price || 0);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(file){
      setSelectedImage(file);
      getImagePreview(file);
    }
  }

  const getImagePreview = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreview(e.target.result);
    }
    
    reader.readAsDataURL(file);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newProductData = { };

    if(name.length < 1 || description.length < 1 || price.valueOf() < 1){
      alert('Asegurate de llenar todos los campos');
      return;
    }

    if(product.name !== name){
      newProductData.name = name;
    }

    if(product.description !== description){
      newProductData.description = description;
    }

    if(product.price !== price){
      newProductData.price = price;
    }

    await updateProduct(newProductData, product.id, name, selectedImage);
    window.location = '/';
  }

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <form 
        className="w-1/2 max-sm:w-11/12 max-w-md"
        method="post"
        onSubmit={e => handleSubmit(e)}
      >

        <div>

          <label 
            htmlFor="name"
            className={labelStyle}
          >
            Nombre
          </label>
          
          <input 
            className={inputStyle}
            type="text" 
            name="name" 
            id="name" 
            onChange={e => setName(e.target.value)}
            value={name}
          />

        </div>

        <div>

          <label 
            htmlFor="description"
            className={labelStyle}
          >
            Descripción
          </label>
          
          <textarea 
            className='resize-none h-28 border-2 w-full rounded-md p-1 outline-pink-500'
            type="text" 
            name="description" 
            id="description" 
            onChange={e => setDescription(e.target.value)}
            value={description}
          />

        </div>

        <div>

          <label 
            htmlFor="price"
            className={labelStyle}
          >
            Precio
          </label>
          
          <input 
            className={inputStyle}
            type="number" 
            name="price" 
            id="price" 
            onChange={e => setPrice(e.target.value)}
            value={price}
          />

        </div>

        <section className={`border-2 p-2 mt-4 rounded-md ${imagePreview ? 'grid grid-cols-2 gap-1': ''}`}>
          <div>

            <label 
              htmlFor="image"
              className={labelStyle}
            >
              Imágen
            </label>
            
            <input 
              className={inputStyle}
              type="file" 
              name="image" 
              id="image" 
              accept="image/jpg,image/jpeg,image/png"
              onChange={handleChange}
            />

          </div>

            {imagePreview && 
              <img 
                src={imagePreview} 
                className='rounded-md'
              />
            }

        </section>

        <section className="mt-10 grid grid-cols-2 h-10 gap-2">
          <Link
            to={'/'}
            className="w-full h-full border-2 rounded-md bg-indigo-200 text-indigo-950 border-indigo-500 grid place-content-center font-semibold"
          >
            Cancelar
          </Link>

          <button 
            type="submit"
            className="w-full h-full border-2 rounded-md bg-indigo-600 text-indigo-50 border-indigo-950 font-semibold"
          >
            Agregar
          </button>
          
          
        </section>


      </form>
    </section>
  );
}