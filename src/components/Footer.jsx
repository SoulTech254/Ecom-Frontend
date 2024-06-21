import { AspectRatio } from "@/components/ui/aspect-ratio";
import walmartLogo from "../assets/images/quickmart.png";
import { Instagram, Facebook, X, Youtube} from 'lucide-react';


export default function Footer() {
  return (
    <div className="bg-white h-96 w-screen p-4 font-lato flex flex-col md:flex-row gap-4">
        <div className="w-1/5 ">
            <AspectRatio ratio={4 / 3}>
            <img src={walmartLogo} alt="" className="w-fit h-fit m-4 " />
            </AspectRatio>
        </div>
        <div className="w-3/5 ml-8 capitalize flex flex-row gap-4  justify-between items-center">
            <div className="flex flex-col gap-4 ">
                <h3 className="text-2xl font-medium">about us</h3>
                <p>corporation governance</p>            
                <p>community</p>
                <p>supplier relation</p>
                <p>branch network</p>
                <p>careers</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-medium">customer service</h3>
                <p>co-operate policies</p>            
                <p>cookies policy</p>
                <p>privacy policy</p>
                <p>return policy</p>
                <p>talk to us</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-medium">services</h3>
                <p>Q-Points loyalty</p>            
                <p>home delivery</p>
                <p>zawadi bora vouchers</p>
                <p>corperate sales</p>
                
            </div>   
           
 
        </div>
        <div className="w-1/5 flex flex-col gap-2 justify-end items-center">
            <h3 className="text-xl capitalize">social media</h3>
            <div className="flex flex-row gap-2">
                <Facebook color="#2e5b47" />
                <Instagram color="#2e5b47" />
                <X color="#2e5b47" />
                <Youtube color="#2e5b47" />

            </div>
        </div>
    </div>
  )
}
//© 2022. Quickmart.