import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-lato">
      <Navbar />
      <div className="container flex-1 p-0 mt-3">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
