import React, { Suspense, lazy } from "react";
import { useGetProducts } from "@/api/ProductApi";
import { useSelector } from "react-redux";
import SkeletonBanner from "@/components/skeletons/SkeletonBanner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductGroupSkeleton from "../components/skeletons/ProductGroupSkeleton";

const ProductGroup = lazy(() => import("@/components/ProductGroup"));
const BannerGroup = lazy(() => import("@/components/BannerGroup"));
const CircleLink = lazy(() => import("@/components/CircleLink"));

const HomePage = () => {
  const { selectedBranch } = useSelector((state) => state.branch);
  const branch = selectedBranch.id;
  const { products, metadata, isProductsLoading } = useGetProducts(branch);

  const banners = [
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_1_07bd7246d5.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_4_6518feb662.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_3_e2a9dbff72.jpg",
    "https://cdnprod.mafretailproxy.com/assets/images/NF_Category_2_21b8f48a7d.jpg",
  ];

  console.log("Products:", products);
  console.log("Metadata:", metadata);

  return (
    <div className="w-full">
      {/* Banner Carousel */}
      <div className="mb-8 flex justify-center lg:w-full w-full ">
        <Suspense fallback={<SkeletonBanner />}>
          <Carousel>
            <CarouselContent>
              <CarouselItem className=" w-full">
                <img
                  src="https://cdnprod.mafretailproxy.com/assets/images/1232x280_2x_814e5fd63c.png"
                  alt="Banner 1"
                  className=" w-full h-auto object-cover"
                  loading="lazy"
                />
              </CarouselItem>
              {/* Add more CarouselItem elements */}
            </CarouselContent>
          </Carousel>
        </Suspense>
      </div>

      <div>
        <h2 className="text-primary font-bold text-2xl w-full text-center mb-4  ">
          Ready Set Shop
        </h2>
        <Suspense fallback={<ProductGroupSkeleton />}>
          <div className="grid sm:grid-cols-6 grid-cols-4 justify-center gap-8">
            <CircleLink
              src="https://cdnprod.mafretailproxy.com/assets/images/4_Meat_and_Poultry_b2ac17efaf.png"
              alt="Nyama Fresh"
              title="Nyama Fresh"
            />
            <CircleLink
              src="https://cdnprod.mafretailproxy.com/assets/images/11_Cleaning_and_Household_ad418b1b70.png"
              alt="Cleaning Supplies"
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
              src="https://cdnprod.mafretailproxy.com/assets/images/4_Meat_and_Poultry_b2ac17efaf.png"
              alt="Nyama Fresh"
              title="Nyama Fresh"
            />
            <CircleLink
              src="https://cdnprod.mafretailproxy.com/assets/images/11_Cleaning_and_Household_ad418b1b70.png"
              alt="Cleaning Supplies"
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
          </div>
        </Suspense>
      </div>

      {/* Best Sellers */}
      <div className="mt-8 w-full">
        <h2 className="text-xl mb-4 font-bold">Best Sellers</h2>
        {isProductsLoading ? (
          <ProductGroupSkeleton />
        ) : (
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGroup products={products} />
          </Suspense>
        )}
      </div>

      <img
        src="https://cdnprod.mafretailproxy.com/assets/images/2nd_It_s_A_Bigger_Deal_Hero_Banner_542395161f.gif"
        alt="Banner 1"
        className="w-full h-auto object-cover my-8"
        loading="lazy"
      />

      {/* Quickmart Exclusives */}
      <div className="mt-8 w-full">
        <h2 className="text-xl mb-4 font-bold">Quickmart Exclusives</h2>
        <Suspense fallback={<ProductGroupSkeleton />}>
          <ProductGroup products={products} />
        </Suspense>
      </div>

      <img
        src="https://cdnprod.mafretailproxy.com/assets/images/Artboard_2_fe33987a10.png"
        alt="Banner 1"
        className="w-full h-auto object-cover my-8"
        loading="lazy"
      />

      {/* Weekly Deals */}
      <div className="mt-8 w-full">
        <h2 className="text-xl mb-4 font-bold">Weekly Deals</h2>
        <Suspense fallback={<ProductGroupSkeleton />}>
          <ProductGroup products={products} />
        </Suspense>
      </div>

      <div className="mt-8">
        <h2 className="text-xl mb-4 font-bold">Electronics</h2>
        <Suspense fallback={<SkeletonBanner />}>
          <BannerGroup banners={banners} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
