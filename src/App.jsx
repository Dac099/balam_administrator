import { Products } from "./pages/products/products";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./components/sideBard";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData: {session} } = useContext(UserContext);

  useEffect(() => {
    if(!session){
      navigate('/inicio');
    }
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