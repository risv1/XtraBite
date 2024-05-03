"use client";

import { DataTable } from "@/components/Table";
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

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/restaurants`)} >Go to Restaurants</div>
        <DataTable columns={columns} data={restaurants} />
    </div>
  );
};

export default BranchesPage;
