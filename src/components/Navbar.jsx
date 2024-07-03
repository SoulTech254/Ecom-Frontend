import { CircleUserRound, LogInIcon, ShoppingCart, Store } from "lucide-react";
import Logo from "../assets/images/quickmart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-16 mb-3 py-3 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3 ">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-12" src={Logo} alt="quickmart Logo" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Select Store */}
            <div className="flex items-center gap-2">
              <Store color="#b12e26" size="24" />
              <Link to="/">Select store</Link>
            </div>

            {/* User Info or Login/Register */}
            {user ? (
              <div className="flex items-center gap-2">
                <CircleUserRound color="#b12e26" size="24" />
                Hello {user.fName}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogInIcon size="24" />
                <Link to="/">Login & Register</Link>
              </div>
            )}

            {/* Cart */}
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
