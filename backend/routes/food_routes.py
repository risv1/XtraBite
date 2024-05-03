from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.food import Food, SubFood
from models.allergens import Allergen, AllergenSeverity

food_router = APIRouter()

@food_router.get("/get_food")
async def get_food():
    cursor.execute("SELECT * FROM food")
    food = cursor.fetchall()
    if not food:
        return {"message": "No food found"}
    else:
        return [{"id": f[0], "name": f[1]} for f in food]

@food_router.get("/get_subfoods")
async def get_food():
    cursor.execute("SELECT * FROM subfoods")
    food = cursor.fetchall()
    if not food:
        return {"message": "No food found"}
    else:
        return [{"id": f[0], "food_id": f[1], "name": f[2], "price": f[3]} for f in food]

@food_router.get("/get_allergens")
async def get_allergens():
    cursor.execute("SELECT * FROM allergens")
    allergens = cursor.fetchall()
    if not allergens:
        return {"message": "No allergens found"}
    else:
        return [{"id": f[0], "name": f[1]} for f in allergens]

@food_router.get("/get_allergen_severity")
async def get_allergen_severity():
    cursor.execute("SELECT * FROM allergen_severity")
    allergen_severity = cursor.fetchall()
    if not allergen_severity:
        return {"message": "No allergen severity found"}
    else:
        return [{"id": f[0], "allergen_id": f[1], "food_id": f[2], "severity": f[3]} for f in allergen_severity]

@food_router.post("/new_food")
async def new_food(body: Food):
    body_data = {
        "name": body.name,
    }
    food_id = uuid4()

    try:
        cursor.execute(
            f"INSERT INTO food (id, name) VALUES ('{food_id}', '{body_data['name']}')"
        )
        connection.commit()
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

    return {"message": "Food added successfully"}


@food_router.post("/new_subfood")
async def new_subfood(body: SubFood):
    body_data = {
        "food_id": body.food_id,
        "name": body.name,
        "price": body.price,
    }
    subfood_id = uuid4()

    try:
        cursor.execute(
            f"SELECT id FROM food WHERE id = '{body_data['food_id']}'"
        )
        food = cursor.fetchone()
        if food:
            cursor.execute(
                f"INSERT INTO food (id, name) VALUES ('{subfood_id}', '{body_data['name']}')"
            )
            cursor.execute(
                f"INSERT INTO subfoods (id, food_id, name, price) VALUES ('{subfood_id}', '{food[0]}', '{body_data['name']}', '{body_data['price']}')"
            )
            connection.commit()
        else:
            return {"message": "Food not found"}
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

    return {"message": "Subfood added successfully", "subfood": {"id": subfood_id, "food_id": food[0], "name": body_data['name'], "price": body_data['price']}}


@food_router.post("/new_allergen")
async def new_allergen(body: Allergen):
    body_data = {
        "name": body.name,
    }
    allergen_id = uuid4()

    try:
        cursor.execute(
            f"INSERT INTO allergens (id, name) VALUES ('{allergen_id}', '{body_data['name']}')"
        )
        connection.commit()
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

    return {"message": "Allergen added successfully"}


@food_router.post("/new_allergen_severity")
async def new_allergen_severity(body: AllergenSeverity):
    body_data = {
        "allergen_id": body.allergen_id,
        "food_id": body.food_id,
        "severity": body.severity,
    }

    try:
        cursor.execute(
            f"SELECT id FROM allergens WHERE id = '{body_data['allergen_id']}'"
        )
        allergen = cursor.fetchone()
        cursor.execute(
            f"SELECT id FROM food WHERE id = '{body_data['food_id']}'"
        )
        food = cursor.fetchone()
        if allergen and food:
            allergen_severity_id = uuid4()
            cursor.execute(
                f"INSERT INTO allergen_severity (id, allergen_id, food_id, severity) VALUES ('{allergen_severity_id}', '{allergen[0]}', '{food[0]}', '{body_data['severity']}')"
            )
            cursor.execute(
                f"INSERT INTO food_allergens (food_id, allergen_id) VALUES ('{food[0]}', '{allergen[0]}')"
            )
            connection.commit()
        else:
            return {"message": "Allergen or food not found"}
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

    return {"message": "Allergen severity added successfully", "allergen_severity": {"allergen_id": allergen[0], "food_id": food[0], "severity": body_data['severity']}}
