"use client";

import { DataTable } from "@/components/Table";
import { access } from "fs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const columns = [
    {
        accessorKey: "food_id",
        header: "Food ID",
    },
    {
        accessorKey: "order_id",
        header: "Order ID",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
  ];

  const [orders, setOrders] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_order_items");
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/orders`)}
      >
        Go to Orders
      </div>
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrdersPage;