import { EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";

const AddressCard = ({ address, onSelectAddress, onDeleteAddress }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    let timer;
    if (showMenu) {
      timer = setTimeout(() => {
        setShowMenu(false);
      }, 3000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timer);
  }, [showMenu]);

  return (
    <div className="relative w-fit flex items-center">
      {showMenu && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            onClick={onDeleteAddress}
            className="p-2 text-red-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none"
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex items-center">
        {address && (
          <>
            <div>
              <input
                type="radio"
                id={address._id}
                name="selectedAddress"
                value={address._id}
                onChange={() => onSelectAddress(address._id)}
              />
              <label htmlFor={address._id}>
                {address.addressType} - {address.address} -{" "}
                {address.nearestBranch}
              </label>
            </div>
          </>
        )}
        <div className="ml-2">
          <button onClick={handleMenuToggle} className="focus:outline-none">
            <EllipsisVertical size={18} className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
