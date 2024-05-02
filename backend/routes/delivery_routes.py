from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.delivery import Delivery, Driver

delivery_router = APIRouter()

@delivery_router.post("/new_driver")
async def new_driver(body: Driver):
    body_data = {
        'name': body.name,
        'phone': body.phone,
    }

    cursor.execute(
        f"SELECT id FROM delivery WHERE id = '{body.delivery_id}'"
    )
    delivery = cursor.fetchone()

    if not delivery:
        return {"error": "Delivery not found"}

    driver_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO driver (id, name, phone) VALUES ('{driver_id}', '{body.name}', '{body.phone}')"
    )
    return {"message": "Driver added successfully"}

@delivery_router.post("/create_delivery")
async def new_delivery(body: Delivery):
    cursor.execute(
        f"SELECT id FROM driver WHERE id = '{body.driver_id}'"
    )
    driver = cursor.fetchone()
    if not driver:
        return {"error": "Driver not found"}

    cursor.execute(
        f"SELECT id FROM orders WHERE id = '{body.order_id}'"
    )
    order = cursor.fetchone()
    if not order:
        return {"error": "Order not found"}

    delivery_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO delivery (id, order_id, driver_id) VALUES ('{delivery_id}', '{body.order_id}', '{body.driver_id}')"
    )
    return {"message": "Delivery added successfully"}

