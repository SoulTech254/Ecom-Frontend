import { useGetProducts } from "@/api/ProductApi";
import MapComponent from "@/components/Map";
import ProductCard from "@/components/ProductCard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const { products, isProductsLoading } = useGetProducts();

  if (isProductsLoading || !products) {
    return <div>Loading...</div>;
  }

  const { results } = products;
  console.log(results);

  return (
<<<<<<< HEAD
    <div className="flex flex-row gap-1 flex-wrap px-4">
=======
    <div className="mt-20">
      <MapComponent />
>>>>>>> d28772213a9c6ea847a5ce1d74c6aa901a31e1fc
      {results.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.productName}
          img={product.images[0]}
          description={product.description}
          price={product.price}
        />
      ))}
       {results.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.productName}
          img={product.images[0]}
          description={product.description}
          price={product.price}
        />
      ))}
      
    </div>
  );
};

export default HomePage;
