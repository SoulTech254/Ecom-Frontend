import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";

export default function ProductGroup({ products }) {
  return (
    <div className="flex flex-col justify-center  items-center">
      <div className="w-full">
        <Carousel
          opts={{
            align: "end",
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="w-full  md:basis-1/4 sm:basis-1/3 basis-1/2 lg:basis-1/6"
              >
                <ProductCard
                  key={product._id}
                  discountPrice={product.discountPrice}
                  price={product.price}
                  brand={product.brand}
                  img={product.images[0]}
                  name={product.productName}
                  id={product._id}
                  stockLevel={product.stockLevel}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
