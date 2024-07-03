import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-white to-gray-300 min-h-screen font-lato">
      <Navbar />
      <div className="mt-20 lg:px-20">{children}</div>
    </div>
  );
};

export default Layout;
