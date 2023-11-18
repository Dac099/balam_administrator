import { useRouteError } from "react-router-dom";
import { SideBar } from "./sideBard";

export const ErrorContainer = () => {
  const error = useRouteError();
  console.log(error)

  return (
    <section>
      <SideBar />
      <article className="ml-16 py-2 grid place-content-center h-screen">
        <p className="text-3xl font-bold text-red-500">{error.message}</p>
      </article>
    </section>
  );
}