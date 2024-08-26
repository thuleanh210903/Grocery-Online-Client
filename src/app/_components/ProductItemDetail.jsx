"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductItemDetail = ({ product }) => {

  const [totalPrice, setTotalPrice] = useState(product.attributes.price)

  const [quantity, setQuantity] = useState(1)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      {product?.attributes?.images?.data?.map((image, index) => {
        const url = image?.attributes?.url;
        const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${url}`;
        return (
          <Image
            key={index}
            src={fullUrl}
            width={300}
            height={300}
            unoptimized={true}
            className="p-5 h-[320px] w-[300px] object-contain"
          />
        );
      })}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="text-sm text-gray-500">
          {product.attributes.description}
        </h2>

        <div className="flex gap-3">
          {product.attributes.price && <h2 className="font-bold text-3xl">${quantity*totalPrice}</h2>}
          <h2
            className={`font-bold text-lg ${
              product.attributes.price && "line-through"
            }`}
          ></h2>
        </div>
        <h2 className="font-medium text-lg">Quantity: {product.attributes.quantity}</h2>

        <div className="flex flex-col items-baseline gap-3">
            <div className="p-2 border flex gap-10 items-center px-5">
                <button onClick={()=>setQuantity(quantity-1)} disabled={quantity==1}>-</button>
                <h2>{quantity}</h2>
                <button onClick={()=>setQuantity(quantity+1)}>+</button>
            </div>

            <Button className="flex gap-3">
                <ShoppingBasket />
                Add To Cart
            </Button>
        </div>

        <h2 className="gap-1"><span className="font-bold">Category:</span>{product.attributes.categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
