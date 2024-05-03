"use client";

import { DataTable } from "@/components/Table";
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

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/subfoods`)} >Find SubFoods for Order</div>
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/food/allergens`)} >View Allergens</div>
        <DataTable columns={columns} data={food} />
    </div>
  );
};

export default FoodPage;
