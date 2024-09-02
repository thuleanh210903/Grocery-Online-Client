"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation";

import {
  CircleUserRound,
  LayoutGrid,
  Link,
  Search,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);

  const isLogIn = sessionStorage.getItem("jwt") ? true : false;
  const router = useRouter()

  const onSignOut = () => {
    sessionStorage.clear()
    router.push('/sign-in')
  } 

  
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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
        <h2 className="flex gap-2 text-lg ">
          <ShoppingBag />0
        </h2>

        {!isLogIn ? (
          <a href="/sign-in">
             <Button as="span">
              
              Login</Button>
          </a>
           
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className=" cursor-pointer h-12 w-12 bg-green-100 text-primary p-2 rounded-full " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My order</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
