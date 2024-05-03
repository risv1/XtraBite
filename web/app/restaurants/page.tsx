"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantPage = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    }
  ];

  const [restaurants, setRestaurants] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_restaurants");
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter()

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  const handleNewRestaurant = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const response = await fetch("http://localhost:8000/new_restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        rating: rating,
      }),
    });
  
    const data = await response.json();
  
    if (data.message === "Restaurant added successfully") {
      console.log("Restaurant added successfully", data);
      router.refresh(); 
    } else {
      console.error("Adding restaurant failed");
    }
  };

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/branches`)} >Find Branches for Restaurants</div>
        <DataTable columns={columns} data={restaurants} />
        <Modal trigger={<Button>Add New Restaurant</Button>}>
      <form onSubmit={handleNewRestaurant} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button type="submit">Add Restaurant</Button>
      </form>
    </Modal>
    </div>
  );
};

export default RestaurantPage;
