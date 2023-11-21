import { Products } from "./pages/products/products";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./components/sideBard";
import { isUserSignedIn } from "./utils/checkSession";
import { useEffect } from "react";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async() => {
      const res = await isUserSignedIn();
      if(res === false) navigate('/inicio');
    }

    fetchData();
  }, []);

  return (
    <main>
      <SideBar />
      <section className="ml-16 py-3">
        {location.pathname === '/' 
          ? <Products />
          : <Outlet />
        }
      </section>
    </main>
  );
}