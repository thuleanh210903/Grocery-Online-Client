"use client";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  CircleUserRound,
  LayoutGrid,
  Link,
  Search,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);

  const jwt = sessionStorage.getItem("jwt");
  const isLogIn = sessionStorage.getItem("jwt") ? true : false;
  const router = useRouter();

  const [totalCart, setTotalCart] = useState(0);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [cartItemList, setCartItemList] = useState([]);

  const [subTotal, setSubTotal] = useState([]);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += element.amount;
    });

    setSubTotal(total);
  }, [cartItemList]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItem();
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const getCartItem = async () => {
    const cartItemList_ = await GlobalApi.getCartItem(user.id, jwt);
    setTotalCart(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const onDeleteItem = (id, jwt) => {
    GlobalApi.deleteCartItem(id, jwt).then((response) => {
      toast("Removed");
      getCartItem();
    });
  };

  return (
    <div className="flex p-5 justify-between">
      <div className="flex items-center gap-8 justify-between">
        <Image src="/logo.png" alt="logo" width={150} height={150} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categoryList.map((category, index) => (
              <Link key={index}>
                <DropdownMenuItem>
                  {category?.attributes?.icon?.data?.map((icon, iconIndex) => {
                    const iconUrl = icon?.attributes?.url;
                    const fullIconUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${iconUrl}`;
                    return (
                      <Image
                        key={iconIndex}
                        src={fullIconUrl}
                        alt={`icon-${iconIndex}`}
                        width={23}
                        height={23}
                        unoptimized={true}
                      />
                    );
                  })}
                  <h2>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 text-lg ">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCart}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal: {subTotal}
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Order
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogIn ? (
          <a href="/sign-in">
            <Button as="span">Login</Button>
          </a>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className=" cursor-pointer h-12 w-12 bg-green-100 text-primary p-2 rounded-full " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/my-order">
                  My order
                </a>
              </DropdownMenuItem>
           
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
