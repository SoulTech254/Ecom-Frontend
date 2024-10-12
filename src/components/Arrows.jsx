import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

export function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-1 top-1/3 transform -translate-y-1/2 z-50 cursor-pointer bg-white border p-2 rounded-full shadow-lg"
      onClick={onClick}
      style={{ display: "block" }}
    >
      <ChevronRight className="text-gray-800 w-6 h-6" /> {/* Lucide icon */}
    </div>
  );
}

// Custom Previous Arrow
export function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-1 top-1/3 transform -translate-y-1/2 z-50 cursor-pointer bg-white p-2 rounded-full shadow-lg"
      onClick={onClick}
      style={{ display: "block" }}
    >
      <ChevronLeft className="text-gray-800 w-6 h-6" /> {/* Lucide icon */}
    </div>
  );
}