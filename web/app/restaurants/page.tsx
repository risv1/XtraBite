"use client";

import { DataTable } from "@/components/Table";
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

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/branches`)} >Find Branches for Restaurants</div>
        <DataTable columns={columns} data={restaurants} />
    </div>
  );
};

export default RestaurantPage;
