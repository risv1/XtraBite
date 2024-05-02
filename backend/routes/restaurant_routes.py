from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.restaurant import Restaurant, Branch

restaurant_router = APIRouter()

@restaurant_router.post("/new_restaurant")
async def new_restaurant(body: Restaurant):
    body_data = {
        "name": body.name,
        "rating": body.rating,
    }
    restaurant_id = uuid4()

    try:
        cursor.execute(
            f"INSERT INTO restaurant (id, name, rating) VALUES ('{restaurant_id}', '{body_data['name']}', '{body_data['rating']}')"
        )
        connection.commit()
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}
    
    return {"message": "Restaurant added successfully"}

@restaurant_router.post("/new_branch")
async def new_branch(body: Branch):
    body_data = {
        "restaurant_id": body.restaurant_id,
        "address": body.address,
        "contact_number": body.contact_number,
    }
    branch_id = uuid4()

    try:
        cursor.execute(
            f"SELECT id FROM restaurant WHERE id = '{body_data['restaurant_id']}'"
        )
        restaurant = cursor.fetchone()
        if restaurant:
            cursor.execute(
                f"INSERT INTO branch (id, restaurant_id, address, contact_number) VALUES ('{branch_id}', '{restaurant[0]}', '{body_data['address']}', '{body_data['contact_number']}')"
            )
            connection.commit()
        else:
            return {"message": "Restaurant not found"}
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}
    
    return {"message": "Branch added successfully", "branch": {"id": branch_id, "restaurant_id": restaurant[0], "address": body_data['address'], "contact_number": body_data['contact_number']}}