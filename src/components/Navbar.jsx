import { CircleUserRound, LogInIcon, ShoppingCart, Store } from "lucide-react";
import Logo from "../assets/images/quickmart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex items-center gap-10 px-12 my-5 mx-10">
      <Link to={"/"} className="w-[20%] hidden">
        <img src={Logo} alt="quickmart Logo" />
      </Link>
      <div className="flex flex-1">
        <SearchBar />
      </div>
      <div className="flex items-center gap-16">
        <div className="flex gap-2 items-center">
          <Store />
          <Link to="/">Select store</Link>
        </div>
        {user ? (
          <div className="flex gap-2 items-center">
            <CircleUserRound />
            Hello   {user.fName}</div>
        ) : (
          <div className="flex gap-2 items-center">
            <LogInIcon/>
            <Link to="/">Login & Register</Link>
          </div>
        )}
        <Cart />
      </div>
    </div>
  );
};

export default Navbar;
