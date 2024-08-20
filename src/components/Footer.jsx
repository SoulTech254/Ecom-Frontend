import { AspectRatio } from "@/components/ui/aspect-ratio";
import walmartLogo from "../assets/images/quickmart.png";
import { Instagram, Facebook, X, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-secondary w-full p-8 flex flex-col md:flex-row gap-4 mt-12 text-white">
      <div className="w-full md:w-1/5 flex flex-col text-white">
        <AspectRatio ratio={4 / 3} className="m-4">
          <img src={walmartLogo} alt="Walmart Logo" className="w-fit h-fit" />
          <h3 className="text-sm capitalize">stay in touch with us</h3>
          <div className="flex flex-row gap-2">
            <Facebook color="#ffffff" />
            <Instagram color="#ffffff" />
            <X color="#ffffff" />
            <Youtube color="#ffffff" />
          </div>
        </AspectRatio>
      </div>
      <div className="w-full md:w-3/5 ml-8 capitalize flex flex-row gap-4 justify-between items-center text-white">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">about us</h3>
          <p className="text-sm">corporation governance</p>
          <p className="text-sm">community</p>
          <p className="text-sm">supplier relation</p>
          <p className="text-sm">branch network</p>
          <p className="text-sm">careers</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">customer service</h3>
          <p className="text-sm">co-operate policies</p>
          <p className="text-sm">cookies policy</p>
          <p className="text-sm">privacy policy</p>
          <p className="text-sm">return policy</p>
          <p className="text-sm">talk to us</p>
        </div>
        <div className="flex flex-col gap-4 h-[100%]">
          <h3 className="text-lg font-medium">services</h3>
          <p className="text-sm">Q-Points loyalty</p>
          <p className="text-sm">home delivery</p>
          <p className="text-sm">zawadi bora vouchers</p>
          <p className="text-sm">corperate sales</p>
        </div>
      </div>
    </div>
  );
}
