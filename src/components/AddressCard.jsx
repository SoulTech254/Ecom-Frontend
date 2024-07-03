import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const AddressCard = ({ address, onSelectAddress, onDeleteAddress }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    onSelectAddress(address._id);
    setIsSelected(true);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation(); // Prevents event bubbling to handleCardClick when clicking on ellipsis button
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`relative flex items-center border-b-2 border-gray-200 py-2 cursor-pointer ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-center w-full">
        <div className="flex-grow">
          <span className="font-bold capitalize">{address.addressType}</span> -{" "}
          {address.address} - {address.apartment} {address.city}
        </div>
        <div className="ml-auto">
          <button onClick={handleMenuToggle} className="focus:outline-none">
            <EllipsisVertical size={18} className="cursor-pointer" />
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
          <ul>
            <li>
              <button
                onClick={onDeleteAddress}
                className="block w-full py-2 text-left px-4 text-red-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none"
              >
                Delete
              </button>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
