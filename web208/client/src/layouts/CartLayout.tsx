import { Outlet } from "react-router-dom";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

function CartLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default CartLayout;
