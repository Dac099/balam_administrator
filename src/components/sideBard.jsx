import { NavLink } from "react-router-dom";
import { CiShop, CiDesktop } from "react-icons/ci";

export const SideBar = () => {
  const activeStyle = 'text-pink-700 bg-pink-300';
  const defaultStyle = 'text-3xl grid place-content-center rounded-lg';

  return (
    <aside className="h-screen w-14 absolute top-0 left-0">
      <nav className="h-full">
        <ul className="p-2 border-2 bg-neutral-100 h-full w-full">

          <li className="mb-5">
            <NavLink
              to={'/'}
              className={({isActive}) => `${defaultStyle} ${isActive ? activeStyle : ''}`}
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
      </nav>
    </aside>
  );
}