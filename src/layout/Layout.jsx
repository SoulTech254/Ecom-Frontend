import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-300 font-lato overflow-x-hidden">
      <Navbar />
      <main className="flex-grow  max-w-full px-4 sm:px-6 lg:px-7 min-h-[80vh] mt-24 mx-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
