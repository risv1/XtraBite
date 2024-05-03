from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.delivery import Delivery, Driver, UpdateDeliveryBody

delivery_router = APIRouter()

@delivery_router.get("/get_deliveries")
async def get_deliveries():
    cursor.execute("SELECT * FROM delivery")
    deliveries = cursor.fetchall()
    if not deliveries:
        return {"message": "No deliveries found"}
    elif len(deliveries) == 0:
        return {"message": "No deliveries found"}
    else:
        return [{"id": f[0], "order_id": f[1], "driver_id": f[2] } for f in deliveries]
    
@delivery_router.get("/get_drivers")
async def get_drivers():
    cursor.execute("SELECT * FROM driver")
    drivers = cursor.fetchall()
    if not drivers:
        return {"message": "No drivers found"}
    elif len(drivers) == 0:
        return {"message": "No drivers found"}
    else:
        return [{"id": f[0], "name": f[1], "phone": f[2] } for f in drivers]

@delivery_router.post("/new_driver")
async def new_driver(body: Driver):
    body_data = {
        'name': body.name,
        'phone': body.phone,
    }

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
        f"SELECT id FROM ind_order WHERE id = '{body.order_id}'"
    )
    order = cursor.fetchone()
    if not order:
        return {"error": "Order not found"}

    delivery_id = str(uuid4())
    cursor.execute(
        f"INSERT INTO delivery (id, order_id, driver_id) VALUES ('{delivery_id}', '{body.order_id}', '{body.driver_id}')"
    )
    return {"message": "Delivery added successfully"}

@delivery_router.post("/update_delivered")
async def update_delivery(body: UpdateDeliveryBody):
    cursor.execute(
        f"SELECT id FROM delivery WHERE order_id = '{body.order_id}'"
    )
    delivery = cursor.fetchone()
    if not delivery:
        return {"message": "Delivery not found"}

    cursor.execute(
        f"UPDATE order_status SET status = 'delivered', description = 'Order was delivered' WHERE order_id = '{body.order_id}'",
    )
    connection.commit()

    return {"message": "Order status updated successfully"}