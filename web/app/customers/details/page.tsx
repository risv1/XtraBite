"use client";

import { DataTable } from "@/components/Table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomersPage = () => {
  const columnsAddress = [
    {
      accessorKey: "id",
        header: "ID",
    },
    {
      accessorKey: "customer_id",
        header: "Customer ID",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "street",
        header: "Street",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "country",
        header: "Country",
    },

  ];

    const columnsEmail = [
        {
        accessorKey: "id",
            header: "ID",
        },
        {
        accessorKey: "customer_id",
            header: "Customer ID",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
    ];

  const [addresses, setAddresses] = useState<any>([]);
  const [emails, setEmails] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_addresses");
      const data = await response.json();
      setAddresses(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_emails");
      const data = await response.json();
      setEmails(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center overflow-auto">
      <div
        className="w-2/3 text-center hover:cursor-pointer font-semibold"
        onClick={() => router.push(`/customers`)}
      >
        Go to Customers
      </div>
      <h1>Addresses</h1>
      <DataTable columns={columnsAddress} data={addresses} />
      <h1 className="mt-10">Emails</h1>
      <DataTable columns={columnsEmail} data={emails} />
    </div>
  );
};

export default CustomersPage;
