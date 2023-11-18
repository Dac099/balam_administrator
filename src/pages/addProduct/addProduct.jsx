export const AddProduct = () => {
  const labelStyle = '';
  const inputStyle = '';

  return (
    <section className="flex justify-center items-center">
      <form>

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

      </form>
    </section>
  );
}