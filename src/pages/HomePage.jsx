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
    <div className="mt-20">
      <MapComponent />
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