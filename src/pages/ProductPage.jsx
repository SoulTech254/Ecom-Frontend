import { useGetAProduct } from "@/api/ProductApi";
import { useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductPage = () => {
  const { id } = useParams();
  const { product, isProductLoading } = useGetAProduct(id);

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { category, productName, brand, SKU, price, description, images } =
    product.product;
  console.log(product);
  console.log(images);

  return (
    <div>
      <div>{description}</div>

      <div>
        <h2>{productName}</h2>
        <p>SKU: {SKU}</p>
        <p>Brand: {brand}</p>
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
                  <img src={image} alt={`Image`} />{" "}
                  {/* Assuming image is a URL */}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {category && (
          <p>
            Category: {category.level_1_name} > {category.level_2_name} >{" "}
            {category.level_3_name}
          </p>
        )}
        <p>Price: KES {price}</p>
      </div>
    </div>
  );
};

export default ProductPage;
