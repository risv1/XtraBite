"use client"

import { useRouter } from "next/navigation";

const OrderPage = () => {

  const router = useRouter()

  return (
    <div className="w-screen h-full flex justify-center">
    <div className=" grid grid-cols-2 justify-center gap-3">
      <div onClick={()=>router.push("/orders/ind_orders")} className="w-60 h-40 dark:bg-indigo-900 rounded-md hover:shadow-blue-500 shadow-md bg-indigo-200 border-2 dark:border-white border-black flex justify-center items-center text-xl">
        Ind_Orders
      </div>
      <div onClick={()=>router.push("/orders/order_items")} className="w-60 h-40 dark:bg-indigo-900 rounded-md hover:shadow-blue-500 shadow-md bg-indigo-200 border-2 dark:border-white border-black flex justify-center items-center text-xl">
        Order_Items
      </div>
      <div onClick={()=>router.push("/orders/order_status")} className="w-60 h-40 dark:bg-indigo-900 rounded-md hover:shadow-blue-500 shadow-md bg-indigo-200 border-2 dark:border-white border-black flex justify-center items-center text-xl">
        Order_Status
      </div>
      <div onClick={()=>router.push("/orders/all_orders")} className="w-60 h-40 dark:bg-indigo-900 rounded-md hover:shadow-blue-500 shadow-md bg-indigo-200 border-2 dark:border-white border-black flex justify-center items-center text-xl">
        Orders
      </div>
    </div>
    </div>
  );
};

export default OrderPage;
