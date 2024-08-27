import { CircleUserRound, LogInIcon, StoreIcon, Menu } from "lucide-react";
import Logo from "../assets/images/quickmart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import StoreSelection from "./StoreSelection";
import { useGetBranches } from "@/api/HomeApi";
import { useState, useEffect } from "react";
import { setBranch } from "@/redux/branch/branchSlice";
import SubcategoryWindow from "@/components/SubcategoryWindow";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { categories } from "@/utils/utils";
import Sheet from "./Sheet";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { branches: apiBranches, isLoadingBranches } = useGetBranches();
  const [branches, setBranches] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadingBranches && apiBranches.length > 0) {
      setBranches(apiBranches);
    }
  }, [apiBranches, isLoadingBranches]);

  const handleSelectBranch = (branch) => {
    dispatch(setBranch(branch));
  };

  const handleSheetClose = () => setIsSheetOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 box-border h-fit mb-3 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              className="w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-auto"
              src={Logo}
              alt="quickmart Logo"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Select Store */}
            <div className="flex items-center gap-1">
              {isLoadingBranches ? (
                <p>Loading...</p>
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
          </div>
          <Cart />

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-orange-500 p-2"
            onClick={() => setIsSheetOpen(true)}
          >
            <Menu />
          </button>

          {/* Mobile Navbar */}
          <Sheet isOpen={isSheetOpen} onClose={handleSheetClose}>
            <MobileNavbar isOpen={isSheetOpen} onClose={handleSheetClose} />
          </Sheet>
        </div>
      </div>

      {/* Mobile Categories */}
      <div className="relative flex justify-center gap-12 text-secondary font-bold box-border hidden md:flex">
        {categories.map((category) => (
          <span
            key={category.id}
            className="relative cursor-pointer p-1 group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {category.name}
            <span className="absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
            {hoveredCategory === category.id && (
              <SubcategoryWindow groups={category.groups} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
