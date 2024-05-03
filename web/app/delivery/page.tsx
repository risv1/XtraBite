"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodPage = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "order_id",
      header: "Order ID",
    },
    {
      accessorKey: "driver_id",
      header: "Driver ID",
    },
  ];

  const [delivery, setDelivery] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_deliveries");
      const data = await response.json();
      setDelivery(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  const [orderId, setOrderId] = useState("");
const [driverId, setDriverId] = useState("");

const handleNewDelivery = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/create_delivery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: orderId,
      driver_id: driverId,
    }),
  });

  const data = await response.json();

  if (data.message === "Delivery added successfully") {
    console.log("Delivery added successfully", data);
    router.refresh(); 
  } else {
    console.error("Adding delivery failed", data);
  }
};

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/delivery/drivers`)}
      >
        Find Drivers
      </div>
      <DataTable columns={columns} data={delivery} />
      <Modal trigger={<Button>Create New Delivery</Button>}>
      <form onSubmit={handleNewDelivery} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Driver ID"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
        <Button type="submit">Create Delivery</Button>
      </form>
    </Modal>
    </div>
  );
};

export default FoodPage;
