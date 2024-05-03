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
      accessorKey: "name",
      header: "Name",
    },
  ];

  const [food, setFood] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_food");
      const data = await response.json();
      setFood(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter()

  const [name, setName] = useState("");

const handleNewFood = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/new_food", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  const data = await response.json();

  if (data.message === "Food added successfully") {
    console.log("Food added successfully", data);
    router.refresh(); 
  } else {
    console.error("Adding food failed");
  }
};


  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/subfoods`)} >Find SubFoods for Order</div>
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/food/allergens`)} >View Allergens</div>
        <DataTable columns={columns} data={food} />
        <Modal trigger={<Button>Add New Food</Button>}>
      <form onSubmit={handleNewFood} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Add Food</Button>
      </form>
    </Modal>
    </div>
  );
};

export default FoodPage;
