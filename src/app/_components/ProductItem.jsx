import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:shadow-lg transition-all ease-in-out">
      {product?.attributes?.images?.data?.map((image, iconIndex) => {
        const url = image?.attributes?.url;
        const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${url}`;
        return (
          <Image
            key={iconIndex}
            src={fullUrl}
            alt={`icon-${iconIndex}`}
            width={500}
            height={200}
            unoptimized={true}
            className="h-[200px] w-[200px] object-contain"
          />
        );
      })}
      <h2 className="font-bold text-lg">{product.attributes.name}</h2>
      <h2 className="font-bold text-green-400">${product.attributes.price}</h2>
      <Button className="text-primary hover:text-white hover:bg-primary hover:scale-125 transition-all ease-in-out" variant="outline">Add to cart</Button>
    </div>
  );
};

export default ProductItem;
