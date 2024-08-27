import { Link } from 'react-router-dom';

const MobileNavLinks = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Link to="/" className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">Home</Link>
      <Link to="/about" className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">About</Link>
      <Link to="/services" className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">Services</Link>
      <Link to="/contact" className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">Contact</Link>
      <Link to="/shop" className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">Shop</Link>
    </div>
  );
};

export default MobileNavLinks;
