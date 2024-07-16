import { useGetProducts } from "@/api/ProductApi";
import MapComponent from "@/components/Map";
import ProductCard from "@/components/ProductCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const { selectedBranch } = useSelector((state) => state.branch);
  const branch = selectedBranch.id;
  const { products, isProductsLoading } = useGetProducts(branch);

  if (isProductsLoading || !products) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-2 flex flex-row gap-1 ">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.productName}
          img={product.images[0]}
          description={product.description}
          price={product.price}
          stockLevel={product.stockLevel}
        />
      ))}
    </div>
  );
};

export default HomePage;
