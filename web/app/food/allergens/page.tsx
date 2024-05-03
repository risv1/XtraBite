"use client";

import { DataTable } from "@/components/Table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AllergensPage = () => {
  const columnAllergens = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const columnAllergenSev = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "allergen_id",
      header: "Allergen ID",
    },
    {
      accessorKey: "food_id",
      header: "Food ID",
    },
    {
      accessorKey: "severity",
      header: "Severity",
    },
  ];

  const [allergens, setAllergens] = useState<any>([]);
  const [allergenSev, setAllergenSev] = useState<any>([]);
  const [viewAll, setViewAll] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_allergens");
      const data = await response.json();
      setAllergens(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/get_allergen_severity"
      );
      const data = await response.json();
      setAllergenSev(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/subfoods`)}
      >
        Go to SubFoods
      </div>
      <div className="hover:cursor-pointer" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "View Allergens" : "View Allergen Severities"}
      </div>
      {viewAll ? (
        <DataTable columns={columnAllergenSev} data={allergenSev} />
      ) : (
        <DataTable columns={columnAllergens} data={allergens} />
      )}
    </div>
  );
};

export default AllergensPage;
