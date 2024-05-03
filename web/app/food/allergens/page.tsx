"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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

  const [name, setName] = useState("");
  const [allergenId, setAllergenId] = useState("");
  const [foodId, setFoodId] = useState("");
  const [severity, setSeverity] = useState("");

  const handleNewAllergen = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/new_allergen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    const data = await response.json();

    if (data.message === "Allergen added successfully") {
      console.log("Allergen added successfully", data);
      router.refresh();
    } else {
      console.error("Adding allergen failed");
    }
  };

  const handleNewAllergenSeverity = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      "http://localhost:8000/new_allergen_severity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          allergen_id: allergenId,
          food_id: foodId,
          severity: severity,
        }),
      }
    );

    const data = await response.json();

    if (data.message === "Allergen severity added successfully") {
      console.log("Allergen severity added successfully", data);
      router.refresh();
    } else {
      console.error("Adding allergen severity failed");
    }
  };

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/subfoods`)}
      >
        Go to SubFoods
      </div>
      <div
        className="hover:cursor-pointer"
        onClick={() => setViewAll(!viewAll)}
      >
        {viewAll ? "View Allergens" : "View Allergen Severities"}
      </div>
      {viewAll ? (
        <>
          <DataTable columns={columnAllergenSev} data={allergenSev} />
          <Modal trigger={<Button>Add New Allergen Severity</Button>}>
            <form
              onSubmit={handleNewAllergenSeverity}
              className="flex flex-col gap-3 w-full h-full p-3"
            >
              <Input
                type="text"
                placeholder="Allergen ID"
                value={allergenId}
                onChange={(e) => setAllergenId(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Food ID"
                value={foodId}
                onChange={(e) => setFoodId(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              />
              <Button type="submit">Add Allergen Severity</Button>
            </form>
          </Modal>
        </>
      ) : (
        <>
          <DataTable columns={columnAllergens} data={allergens} />
          <Modal trigger={<Button>Add New Allergen</Button>}>
            <form
              onSubmit={handleNewAllergen}
              className="flex flex-col gap-3 w-full h-full p-3"
            >
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit">Add Allergen</Button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AllergensPage;
