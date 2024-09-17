"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MyOrderItem } from "./_components/MyOrderItem";
const MyOrder = () => {
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    console.log(orderList_)
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className="bg-primary text-xl font-bold text-center text-white">
        My order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order history</h2>
        <div>
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex gap-24">
                  <h2><span className="font-bold mr-2">Order Date:</span>{moment(item?.createdAt).format('DD/MMM/yyy')}</h2>
                  <h2><span className="font-bold mr-2">Total amount: </span>{item.totalOrder} </h2>
                  <h2><span className="font-bold mr-2">Status: </span>{item.status}</h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order,index) => {
                  <MyOrderItem orderItem = {order} />
                })}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyOrder;
