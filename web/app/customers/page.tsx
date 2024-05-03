"use client";

import { Modal } from "@/components/Modal";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomersPage = () => {
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

  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [street, setStreet] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [country, setCountry] = useState("");

const handleRegister = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      street: street,
      city: city,
      state: state,
      country: country,
    }),
  });

  const data = await response.json();

  if (data.message === "User registered successfully") {
    console.log("User registered successfully", data);
    router.refresh();
  } else {
    console.error("Registration failed");
  }
};

  const [customers, setCustomers] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_customers");
      const data = await response.json();
      setCustomers(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const router = useRouter()

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
        <div className="w-2/3 text-center hover:cursor-pointer font-semibold" onClick={()=>router.push(`/customers/details`)} >Find Details of Customers</div>
        <DataTable columns={columns} data={customers} />
        <Modal trigger={<Button>Register</Button>}>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-full h-full p-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
    </Modal>
    </div>
  );
};

export default CustomersPage;
