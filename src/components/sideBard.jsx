import { NavLink } from "react-router-dom";
import { CiShop, CiDesktop } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";

export const SideBar = () => {
  const activeStyle = 'text-pink-700 bg-pink-300';
  const defaultStyle = 'text-3xl grid place-content-center rounded-lg';

  return (
    <aside className='h-screen w-14 fixed top-0 left-0'>
      <nav className="h-full relative">
        <ul className="p-2 border-2 bg-neutral-100 h-full w-full">

          <li className="mb-5">
            <NavLink
              to={'/'}
              className={({isActive}) => {
                return `${defaultStyle} ${isActive  ? activeStyle : ''}`;
              }}
            >
              <CiDesktop />
            </NavLink>
          </li>

          <li className="mb-5">
            <NavLink
              to={'/imagenes'}
              className={({isActive}) => `${defaultStyle} ${isActive ? activeStyle : ''}`}
            >
              <CiShop />
            </NavLink>
          </li>

        </ul>

        <li className="absolute list-none z-10 bottom-3 left-1/3">
          <button
            type="button"
            className="text-2xl grid place-content-center"
          >
            <IoExitOutline />
          </button>
        </li>

      </nav>
    </aside>
  );
}