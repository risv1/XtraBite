from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.restaurant import Restaurant, Branch

restaurant_router = APIRouter()

@restaurant_router.get("/get_restaurants")
async def get_restaurants():
    cursor.execute("SELECT * FROM restaurant")
    restaurants = cursor.fetchall()
    if not restaurants:
        return {"message": "No restaurants found"}
    elif len(restaurants) == 0:
        return {"message": "No restaurants found"}
    else:
        return [{"id": f[0], "name": f[1], "rating": f[2] } for f in restaurants]

@restaurant_router.get("/get_branches")
async def get_branches():
    cursor.execute("SELECT * FROM branch")
    branches = cursor.fetchall()
    if not branches:
        return {"message": "No branches found"}
    elif len(branches) == 0:
        return {"message": "No branches found"}
    else:
        return [{"id": f[0], "restaurant_id": f[1], "address": f[2], "contact_number": f[3]} for f in branches]

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