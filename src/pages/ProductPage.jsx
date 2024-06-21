import React from 'react';
import { useGetAProduct } from "@/api/ProductApi";
import { useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Plus } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const { product, isProductLoading } = useGetAProduct(id);

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { category, productName, brand, SKU, price, description, images } = product.product;

  // Generate an array of numbers from 1 to SKU
  const options = Array.from({ length: SKU }, (_, i) => i + 1);

  return (
    <div>
      {/*  <div>{description}</div> */}

      <div className=' '>

        {category && (
          <p className="category-path capitalize py-2 pl-8">
            <span className="level-1">{category.level_1_name}</span>
            {'> '}
            <span className="level-2">{category.level_2_name}</span>
            {'> '}
            <span className="level-3">{category.level_3_name}</span>
          </p>
        )}

        <div className="flex gap-16 ">

        <div className="w-[30%]">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image}>
                  <img src={image} alt="Product" />{" "}
                  {/* Assuming image is a URL */}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className='flex flex-col gap-2 '>
        
        <h2 className="text-3xl capitalize">{productName}</h2>
        <p className="text-sm ">Brand:<span className='capitalize text-primary'>{brand}</span> </p>
        <h2 className=" capitalize">{productName}</h2>
        <p className="text-3xl capitalize">Price: KES {price}</p>

        
        <label htmlFor="quantity" className="text-sm capitalize">Quantity</label>
        <select className="h-10 w-40 flex justify-center items-center bg-slate-200" id="quantity" name="quantity">
          {options.map((option) => (
            <option className='text-center ' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        <div className='flex gap-10'>
        <button type='button' className="flex items-center justify-center bg-primary text-white rounded-3xl py-2 px-4" >   
          buy now
        </button>
        <button type='button' className="flex items-center justify-center bg-primary text-white rounded-3xl py-2 px-4" >   
          Add to Cart
        </button>

        </div>

        </div>

        </div>

     

        {/* <p>SKU: {SKU}</p> */}
      </div>
    </div>
  );
};

export default ProductPage;
