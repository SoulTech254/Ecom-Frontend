import { Plus, Minus } from "lucide-react";

const Counter = ({ onPlusClick, onMinusClick, itemCount }) => {
  return (
    <div className="flex gap-1">
      <button type="button" onClick={onMinusClick}>
        <Minus />
      </button>
      <div className=" flex items-center justify-center border border-gray-400 bg-white h-6 w-6">
        {itemCount}
      </div>
      <button type="button" onClick={onPlusClick}>
        <Plus />
      </button> 
    </div>
  );
};

export default Counter;
