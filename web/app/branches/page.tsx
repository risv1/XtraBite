"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { access } from "fs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BranchesPage = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "restaurant_id",
      header: "Restaurant ID",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "contact_number",
        header: "Contact Number",
    },
  ];

  const [restaurants, setRestaurants] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_branches");
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter()

  const [restaurantId, setRestaurantId] = useState("");
const [address, setAddress] = useState("");
const [contactNumber, setContactNumber] = useState("");

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/new_branch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      restaurant_id: restaurantId,
      address: address,
      contact_number: contactNumber,
    }),
  });

  const data = await response.json();

  if (data.message === "Branch added successfully") {
    console.log("Branch created successfully", data);
    router.refresh()
  } else {
    console.error("Branch creation failed");
  }
};

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/restaurants`)} >Go to Restaurants</div>
        <DataTable columns={columns} data={restaurants} />
        <Modal trigger={<Button>Send Branch</Button>}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Restaurant ID"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <Button type="submit">Create Branch</Button>
      </form>
        </Modal>
    </div>
  );
};

export default BranchesPage;
