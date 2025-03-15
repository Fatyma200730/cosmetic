import { Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const LayoutGuest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LayoutGuest;