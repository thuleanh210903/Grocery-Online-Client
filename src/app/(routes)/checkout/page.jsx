"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [totalCart, setTotalCart] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);

  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const router = useRouter();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [zip, setZip] = useState();

  const [totalAmount, setTotalAmount] = useState();
  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItem();
  }, []);
  const getCartItem = async () => {
    const cartItemList_ = await GlobalApi.getCartItem(user.id, jwt);
    setTotalCart(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const [subTotal, setSubTotal] = useState([]);
  useEffect(() => {
    let total = 0;
    if (cartItemList.length > 0) {
      cartItemList.forEach((element) => {
        total += element.amount;
      });
    }
    setSubTotal(total);
  }, [cartItemList]);


  const calculateTotal = () => {
    const total = subTotal * 0.9 + 15;
    return total.toFixed(2);
  };


  const onApprove = (data) => {
    console.log(data)
  }
  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total cart: ({totalCart})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subTotal}</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax :<span>${(totalCart * 0.9).toFixed(2)}</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              Total: <span>${calculateTotal()}</span>{" "}
            </h2>

            <PayPalButtons
              style={{ layout: "horizontal" }}
              onApprove={onApprove}
              forceReRender={[subTotal]}
              createOrder={(data, actions) => {
                const total = calculateTotal();
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
