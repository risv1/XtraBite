from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.orders import Order

order_router = APIRouter()


@order_router.post("/new_order")
async def new_order(body: Order):
    cursor.execute(
        f"SELECT id FROM restaurant WHERE id = '{body.restaurant_id}'"
    )
    restaurant = cursor.fetchone()
    if not restaurant:
        return {"error": "Restaurant not found"}

    cursor.execute(
        f"SELECT id FROM customer WHERE id = '{body.customer_id}'"
    )
    customer = cursor.fetchone()
    if not customer:
        return {"error": "Customer not found"}

    order_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO ind_order (id, customer_id, price, preferences) VALUES ('{order_id}', '{body.customer_id}', '{0}', '{body.preferences}')"
    )

    orders_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO orders (id, restaurant_id, customer_id, name, order_id) VALUES ('{orders_id}', '{body.restaurant_id}', '{body.customer_id}', '{body.name}', '{order_id}')"
    )

    for item in body.items:
        cursor.execute(
            f"SELECT id FROM food WHERE id = '{item.food_id}'"
        )
        food = cursor.fetchone()
        if not food:
            return {"error": "Food not found"}

        cursor.execute(
            f"INSERT INTO order_items (food_id, price, quantity, order_id) VALUES ('{item.food_id}', '{item.ind_price}', '{item.quantity}', '{order_id}')"
        )

    order_status_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO order_status (id, order_id, status, description) VALUES ('{order_status_id}', '{order_id}', 'pending', 'Order is pending')"
    )

    final_price = 0
    for item in body.items:
        final_price += item.ind_price * item.quantity

    cursor.execute(
        f"UPDATE ind_order SET price = {final_price} WHERE id = '{order_id}'"
    )

    connection.commit()

    return {"message": "Order created successfully"}
