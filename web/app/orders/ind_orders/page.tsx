"use client";

import { DataTable } from "@/components/Table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "customer_id",
      header: "Customer ID",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
        accessorKey: "preferences",
        header: "Preferences",
    }
  ];

  const [orders, setOrders] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_ind_orders");
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