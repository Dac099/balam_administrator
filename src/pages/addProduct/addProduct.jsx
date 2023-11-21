import { useImageStorage } from "../../hooks/useImageStorage";
import { useState } from "react";
import { redirect } from "react-router-dom";

export const AddProduct = () => {
  const labelStyle = 'block font-semibold';
  const inputStyle = 'border-2 outline-pink-500 w-full h-10 rounded-md p-1';
  const { uploadError, uploadImage, uploadImageUlr } = useImageStorage();
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ imagePreview, setImagePreview ] = useState(null);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(file){
      console.log(file.type, file.name)
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

    if(name.length < 1 || description.length < 1 || price.valueOf() < 1){
      alert('Asegurate de llenar todos los campos');
      return;
    }

    const imageType = selectedImage.type.split('/')[1];
    const imageName = name.trim().split(' ').join('_');
    const imagePath = `images/${imageName}.${imageType}`;

    await uploadImage(selectedImage, imagePath, 'products');

    console.log(uploadImageUlr);

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

        <section className={`border-2 p-2 mt-4 rounded-md ${imagePreview ? 'grid grid-cols-2': ''}`}>
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
                className=''
              />
            }

        </section>

        <button 
          type="submit"
          className="block mx-auto h-10 w-1/2 mt-10 border-2 rounded-md bg-indigo-600 text-indigo-50 border-indigo-950"
        >
          Agregar
        </button>

      </form>
    </section>
  );
}