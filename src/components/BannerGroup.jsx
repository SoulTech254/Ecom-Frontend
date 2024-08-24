import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BannerGroup({ banners }) {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "end",
          }}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem
                key={index}
                className="w-full md:basis-1/3 lg:basis-1/4"
              >
                <img
                  src={banner}
                  alt="Banner"
                  className="w-300px] h-auto object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {banners.length > 4 && (
            <div className="">
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
