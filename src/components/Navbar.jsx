import { CircleUserRound, LogInIcon, ShoppingCart, Store } from "lucide-react";
import Logo from "../assets/images/quickmart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className=" fixed w-full flex items-center gap-10 border-b px-16 mb-3 pb-6 pt-3 bg-white  bg">
      <Link to={"/"} className="w-[20%]">
        <img src={Logo} alt="quickmart Logo" />
      </Link>
      <div className="flex flex-1">
        <SearchBar />
      </div>
      <div className="flex items-center gap-16">
        <div className="flex gap-2 items-center">
          <Store color="#b12e26" />
          <Link to="/">Select store</Link>
        </div>
        {user ? (
          <div className="flex gap-2 items-center">
            <CircleUserRound color="#b12e26" />
            Hello {user.fName}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <LogInIcon />
            <Link to="/">Login & Register</Link>
          </div>
        )}
        <Cart />
      </div>
    </div>
  );
};

export default Navbar;
