import { Outlet, useLocation } from "react-router-dom";
import BannerSlideshow from "src/components/BannerClient";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";

function ClientLayout() {
  const { loading } = useLoading();
  const location = useLocation();

  const showBanner = location.pathname === "/";

  return (
    <>
      <Loading isShow={loading} />
      <Header />
      {showBanner && <BannerSlideshow />}
      <Outlet />
      <Footer />
    </>
  );
}

export default ClientLayout;
