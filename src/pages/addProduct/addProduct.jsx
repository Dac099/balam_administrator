export const AddProduct = () => {
  const labelStyle = 'block font-semibold';
  const inputStyle = 'border-2 outline-pink-500 w-full h-10 rounded-md p-1';

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <form className="w-1/2 max-sm:w-11/12 max-w-md">

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
          />

        </div>

        <div>

          <label 
            htmlFor="image"
            className={labelStyle}
          >
            Imágenes
          </label>
          
          <input 
            className={inputStyle}
            type="file" 
            name="image" 
            id="image" 
            accept="image/jpg,image/jpeg,image/png"
          />

        </div>

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