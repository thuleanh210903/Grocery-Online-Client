"use client"
import React, { useContext, useState } from "react";
import Image from "next/image";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {

  const jwt = sessionStorage.getItem('jwt')

  const user = JSON.parse(sessionStorage.getItem('user'))

  const [totalPrice, setTotalPrice] = useState(product.attributes.price)

  const [quantity, setQuantity] = useState(1)

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {updateCart, setUpdateCart} = useContext(UpdateCartContext)

  const addToCart = ()=> {
    setLoading(true)
    if(!jwt) {
      router.push('/sign-in')
      setLoading(false)
      return
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity*totalPrice).toFixed(2),
        products: product.id,
        users_permissions_user:user.id,
        userId: user.id
      }

     
    }

    console.log(data)

    GlobalApi.addToCart(data,jwt).then(response=>{
      setLoading(false)
      toast('Added to cart')
      setUpdateCart(!updateCart)
    },(e)=>{
      toast('Error')
      setLoading(false)
    })
  }
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

            <Button className="flex gap-3" onClick={()=>addToCart()} disabled={loading}>
                <ShoppingBasket />
                {loading?<LoaderCircle className="animate-spin"></LoaderCircle>:'Add to cart'}
            </Button>
        </div>

        <h2 className="gap-1"><span className="font-bold">Category:</span>{product.attributes.categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
