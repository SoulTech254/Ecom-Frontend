// components/MobileNavbar.js
import { CircleUserRound, LogInIcon, StoreIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StoreSelection from "./StoreSelection";
import { useGetBranches } from "@/api/HomeApi";
import { setBranch } from "@/redux/branch/branchSlice";
import { categories } from "@/utils/utils";
import { useState, useEffect } from "react";
import SubcategoryWindow from "@/components/SubcategoryWindow"; // Import SubcategoryWindow
import { ScrollArea } from "./ui/scroll-area";

const MobileNavbar = ({ isOpen }) => {
  const { user } = useSelector((state) => state.user);
  const { branches: apiBranches, isLoadingBranches } = useGetBranches();
  const [branches, setBranches] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadingBranches && apiBranches.length > 0) {
      setBranches(apiBranches);
    }
  }, [apiBranches, isLoadingBranches]);

  const handleSelectBranch = (branch) => {
    dispatch(setBranch(branch));
  };

  const toggleCategory = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed mt-1 right-0 h-full w-80 bg-white  transform transition-transform translate-x-0">
      <ScrollArea className="h-full p-4">
        <div className="space-y-4">
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

          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Categories</h2>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <div key={category.id} className="relative group">
                  <button
                    className="w-full text-left pl-1 rounded"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.name}
                  </button>

                  {/* Drop area for subcategories */}
                  {openCategoryId === category.id && (
                    <div className="flex flex-col ml-4 rounded p-2">
                      {category.groups.map((group) => (
                        <div key={group.title} className="mb-2">
                          <h3 className="font-semibold">{group.title}</h3>
                          <ul className="list-none pl-4">
                            {group.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link to={sub.link} className="text-gray-400">
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileNavbar;
