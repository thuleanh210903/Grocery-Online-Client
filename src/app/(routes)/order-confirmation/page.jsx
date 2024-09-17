import { CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
const OrderConfirmation = () => {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
        <CheckCircle2 className="h-24 w-24 text-primary" />
        <h2 className="font-medium text-3xl text-primary">
          Order successfully
        </h2>
        <h2>Thank you so much for order</h2>
        <Button className="mt-8">Track your order</Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
