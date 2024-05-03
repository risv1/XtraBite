"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DriverPage = () => {
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
      accessorKey: "phone",
      header: "Phone",
    },
  ];

  const [driver, setDriver] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_drivers");
      const data = await response.json();
      setDriver(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter();
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");

const handleNewDriver = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/new_driver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
    }),
  });

  const data = await response.json();

  if (data.message === "Driver added successfully") {
    console.log("Driver added successfully", data);
    router.refresh();
  } else {
    console.error("Adding driver failed");
  }
}

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/delivery`)}
      >
        Go to Deliveries
      </div>
      <DataTable columns={columns} data={driver} />
      <Modal trigger={<Button>Add New Driver</Button>}>
      <form onSubmit={handleNewDriver} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit">Add Driver</Button>
      </form>
    </Modal>
    </div>
  );
}

export default DriverPage
