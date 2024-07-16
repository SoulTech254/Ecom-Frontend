import { CircleUserRound, LogInIcon, StoreIcon } from "lucide-react";
import Logo from "../assets/images/quickmart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import StoreSelection from "./StoreSelection";
import { useGetBranches } from "@/api/HomeApi";
import { useState, useCallback, useEffect } from "react"; // Import useState and useEffect
import { setBranch } from "@/redux/branch/branchSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { branches: apiBranches, isLoadingBranches } = useGetBranches();
  const [branches, setBranches] = useState([]); // Local state to store branches

  const dispatch = useDispatch();

  useEffect(() => {
    // Update local state with API branches once they are loaded
    if (!isLoadingBranches && apiBranches.length > 0) {
      setBranches(apiBranches);
    }
  }, [apiBranches, isLoadingBranches]);

  const handleSelectBranch = (branch) => {
    dispatch(setBranch(branch));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-2 mb-3 py-1 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-8" src={Logo} alt="quickmart Logo" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Select Store */}
            <div className="flex items-center gap-1">
              {isLoadingBranches ? (
                <p>Loading...</p> // Handle loading state here
              ) : (
                <>
                  <StoreIcon color="#b12e26" size={20} />
                  <StoreSelection
                    branches={branches}
                    onSelectBranch={handleSelectBranch}
                  />
                </>
              )}
            </div>

            {/* User Info or Login/Register */}
            <div className="flex items-center gap-1">
              {user ? (
                <>
                  <Popover>
                    <PopoverTrigger className="flex hover:text-[#b12e26] items-center gap-1">
                      <CircleUserRound color="#b12e26" size="20" />
                      <p className="text-sm">Hello {user.fName}</p>
                    </PopoverTrigger>
                    <PopoverContent className="w-[150px] p-2">
                      <Link className="hover:text-[#b12e26]" to="/orders">
                        Orders
                      </Link>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  <LogInIcon color="#b12e26" size="20" />
                  <Link to="/">Login & Register</Link>
                </>
              )}
            </div>

            {/* Cart */}
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
