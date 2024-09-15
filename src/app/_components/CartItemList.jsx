"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const CartItemList = ({ cartItemList, onDeleteItem }) => {

  return (
    <div>
      <div>
        {cartItemList.map((cart, index) => (
          <div className="flex justify-between items-center p-2 mb-5">
            <div key={index} className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                className="border p-2"
                alt="image"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">$ {cart.amount}</h2>
              </div>
             
            </div>
            <TrashIcon className="cursor-pointer" onClick={() => onDeleteItem(cart.id)} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CartItemList;
