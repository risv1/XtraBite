from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.food import Food, SubFood
from models.allergens import Allergen, AllergenSeverity

food_router = APIRouter()


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
