import { Outlet, useOutletContext } from "react-router-dom";

export default function PlayLayout() {
  let rootContext = useOutletContext();
  return (
    <>
      <Outlet context={rootContext} />
    </>
  );
}
