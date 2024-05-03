"use client";

import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const FoodPage = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "food_id",
      header: "Food ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "add",
      header: "Add to Cart",
      cell: ({ row }: any) => (
        <Button onClick={() => addToCart(row.original)}>Add to Cart</Button>
      ),
    },
  ];

  const [food, setFood] = useState<any>([]);
  const [customerId, setCustomerId] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get_subfoods");
      const data = await response.json();
      setFood(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/new_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        customer_id: customerId,
        name: "order",
        preferences: "none",
        items: cart.map((item) => ({
          food_id: item.id,
          ind_price: item.price,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (data.message === "Order created successfully") {
      setCart([]);
      // Show success message
    } else {
      // Show error message
    }
  };

  return (
    <div className="w-screen mt-10 flex-col h-full flex justify-center gap-5 items-center">
      <div className="flex flex-row gap-3">
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          className="dark:border-white dark:bg-gray-950 border-2 border-black rounded-md p-1"
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Restaurant ID"
          value={restaurantId}
          className="dark:border-white dark:bg-gray-950 border-2 border-black rounded-md p-1"
          onChange={(e) => setRestaurantId(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={food} />
      {cart.map((item) => (
        <>
          <div key={item.id} className="flex flex-row gap-3 items-center">
            <div>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
            <input
              type="number"
              value={item.quantity}
              className="dark:border-white border-2 border-black rounded-md h-10 w-10 p-1"
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />
          </div>
        </>
      ))}
      <button disabled={cart.length === 0}>Submit Order</button>
    </div>
  );
};

export default FoodPage;
