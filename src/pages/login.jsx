import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';

export const Login = () => {
  const navigate = useNavigate();
  const { userData: user, setUserData } = useContext(UserContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const inputStyle = 'h-10 border-2 outline-pink-200 rounded-md pl-2 text-neutral-700';
  const labelStyle = 'font-semibold text-neutral-600';
  const containerStyle = 'flex flex-col gap-1';

  useEffect(() => {
    console.log(user)
    if(user !== undefined && user.session !== undefined && user.session !== null){
      navigate('/');
    }
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(email.length < 1 || password.length < 1){
      alert('Debes de llenar todos los campos');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({email,password});
    if(!error){
      console.log(data);
      navigate('/');
    }else{
      console.log(error);
      alert('Usuario o contraseña incorrectos');
    }

  }

  return (
    <section className='w-screen h-screen flex flex-col gap-2 justify-center items-center'>
      <p className='text-3xl font-bold text-pink-500'>Inicia sesión</p>

      <form 
        className='border-2 p-3 rounded-md shadow-md w-1/3 min-w-[300px]'
        onSubmit={e => handleSubmit(e)}
      >

        <div className={containerStyle}>
          <label 
            htmlFor="email"
            className={labelStyle}
          >
            Correo
          </label>
          <input 
            className={inputStyle}
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={containerStyle}>
          <label 
            htmlFor="password"
            className={labelStyle}
          >
            Constraseña
          </label>
          <input 
            className={inputStyle}
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className=' block mx-auto w-1/2 h-10 mt-10 border-2 rounded-md bg-pink-300 border-pink-100 font-semibold text-pink-950'
        >
          Ingresar
        </button>

      </form>
    </section>
  );
}