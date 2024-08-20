import React from "react";
import { useGetProducts } from "@/api/ProductApi";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CircleLink from "@/components/CircleLink";
import ProductGroup from "@/components/ProductGroup";
import BannerGroup from "@/components/BannerGroup";

const HomePage = () => {
  const { selectedBranch } = useSelector((state) => state.branch);
  const branch = selectedBranch.id;
  const { products, isProductsLoading } = useGetProducts(branch);

  const banners = [
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_1_07bd7246d5.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_4_6518feb662.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_3_e2a9dbff72.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_2_21b8f48a7d.jpg",
  ];
  console.log(products);

  if (isProductsLoading || !products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100%]">
      {/* Banner Carousel */}
      <div className="mb-8 flex justify-center lg:w-[100%] p-2 ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <img
                src="https://cdnprod.mafretailproxy.com/assets/images/1232x280_2x_814e5fd63c.png"
                alt="Banner 1"
                className="w-full h-auto object-cover "
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://cdnprod.mafretailproxy.com/assets/images/2nd_It_s_A_Bigger_Deal_Hero_Banner_542395161f.gif"
                alt="Banner 2"
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div className="">
        <h2 className="text-primary font-bold text-2xl w-full text-center mb-4">
          Ready Set Shop
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/4_Meat_and_Poultry_b2ac17efaf.png"
            alt="Nyama Fresh"
            title="Nyama Fresh"
          />
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/11_Cleaning_and_Household_ad418b1b70.png"
            alt="Nyama Fresh"
            title="Cleaning Supplies"
          />
          <CircleLink
            src="https://imgs.search.brave.com/EOR__1jmbm4yjs1au4L3XUTtYQNCi6nPFmMgSInOzpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY5/MzQ3MjAzL3Bob3Rv/L2JyZWFrZmFzdC1j/ZXJlYWwuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPU8yVXdx/dEJfaXBuSUFqSzd5/SV95Um5CN0I4eDhL/cXRHVlc1WkF2QjIy/b1E9"
            title="Cereals"
          />
          <CircleLink
            src="https://imgs.search.brave.com/uMDuKuUoGtV6Rn6rlqI3NHqoxmeEauBrBn6GmihKtmA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjQ2/MDExMDIxL3Bob3Rv/L2JvdHRsZS1vZi1y/ZWQtd2luZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9M05u/VnlxbmVmMlhXeTZC/bWhYejVrMUtxSTM0/cVR1ODBvWW5SRVFF/QXkzaz0"
            title="Pombe"
          />
          <CircleLink
            src="https://imgs.search.brave.com/e1_a30ZLwQgjAuzB18ZQEg5WU2kRqisQDVAEuIeZGSA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzkzLzMwLzc1/LzM2MF9GXzQ5MzMw/NzUxMF9SQVpadlRC/ZW1zeE82bGdETWJs/MEZaSDYxT3Y5ZExQ/ci5qcGc"
            title="Bakery"
          />
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/Small_Appliances_28ce5daf1a_f973395a41.jpg"
            title="Small Appliances"
          />
          <CircleLink
            src="	https://cdnprod.mafretailproxy.com/assets/images/19_Large_Appliances_3840ab8ab9_8ac5e15b4f.jpg"
            title="Electronics"
          />
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/4_Meat_and_Poultry_b2ac17efaf.png"
            alt="Nyama Fresh"
            title="Nyama Fresh"
          />
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/11_Cleaning_and_Household_ad418b1b70.png"
            alt="Nyama Fresh"
            title="Cleaning Supplies"
          />
          <CircleLink
            src="https://imgs.search.brave.com/EOR__1jmbm4yjs1au4L3XUTtYQNCi6nPFmMgSInOzpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY5/MzQ3MjAzL3Bob3Rv/L2JyZWFrZmFzdC1j/ZXJlYWwuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPU8yVXdx/dEJfaXBuSUFqSzd5/SV95Um5CN0I4eDhL/cXRHVlc1WkF2QjIy/b1E9"
            title="Cereals"
          />
          <CircleLink
            src="https://imgs.search.brave.com/uMDuKuUoGtV6Rn6rlqI3NHqoxmeEauBrBn6GmihKtmA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjQ2/MDExMDIxL3Bob3Rv/L2JvdHRsZS1vZi1y/ZWQtd2luZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9M05u/VnlxbmVmMlhXeTZC/bWhYejVrMUtxSTM0/cVR1ODBvWW5SRVFF/QXkzaz0"
            title="Pombe"
          />
          <CircleLink
            src="https://imgs.search.brave.com/e1_a30ZLwQgjAuzB18ZQEg5WU2kRqisQDVAEuIeZGSA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzkzLzMwLzc1/LzM2MF9GXzQ5MzMw/NzUxMF9SQVpadlRC/ZW1zeE82bGdETWJs/MEZaSDYxT3Y5ZExQ/ci5qcGc"
            title="Bakery"
          />
          <CircleLink
            src="https://cdnprod.mafretailproxy.com/assets/images/Small_Appliances_28ce5daf1a_f973395a41.jpg"
            title="Small Appliances"
          />
          <CircleLink
            src="	https://cdnprod.mafretailproxy.com/assets/images/19_Large_Appliances_3840ab8ab9_8ac5e15b4f.jpg"
            title="Electronics"
          />
        </div>
      </div>

      {/* Best Sellers */}
      <div className="mt-8 w-full ">
        <h2 className="text-xl mb-4 font-bold">Best Sellers</h2>
        <ProductGroup products={products} />
      </div>

      <img
        src="https://cdnprod.mafretailproxy.com/assets/images/2nd_It_s_A_Bigger_Deal_Hero_Banner_542395161f.gif"
        alt="Banner 1"
        className="w-full h-auto object-cover my-8 "
      />

      {/* Quickmart Exclusives */}
      <div className="mt-8 w-full">
        <h2 className="text-xl mb-4 font-bold">Quickmart Exclusives</h2>
        <ProductGroup products={products} />
      </div>

      <img
        src="	https://cdnprod.mafretailproxy.com/assets/images/Artboard_2_fe33987a10.png"
        alt="Banner 1"
        className="w-full h-auto object-cover my-8 "
      />

      {/* Quickmart Exclusives */}
      <div className="mt-8 w-full">
        <h2 className="text-xl mb-4 font-bold">Weekly Deals</h2>
        <ProductGroup products={products} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl mb-4 font-bold">Electronics</h2>
        <BannerGroup banners={banners} />
      </div>
    </div>
  );
};

export default HomePage;
