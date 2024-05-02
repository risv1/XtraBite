from fastapi import APIRouter
from uuid import uuid4
from database.db import cursor, connection
from models.customer import Register, Login

user_router = APIRouter()

@user_router.post("/register")
async def register(body: Register):
    body_data = {
        "name": body.name,
        "email": body.email,
        "phone": body.phone,
        "street": body.street,
        "city": body.city,
        "state": body.state,
        "country": body.country,
    }
    customer_id = uuid4()

    try:
        cursor.execute(
            f"INSERT INTO customer (id, name) VALUES ('{customer_id}', '{body_data['name']}')"
        )
        cursor.execute(
            f"INSERT INTO addresses (address_id, customer_id, phone, street, city, state, country) VALUES ('{uuid4()}', '{customer_id}' ,'{body_data['phone']}', '{body_data['street']}', '{body_data['city']}', '{body_data['state']}', '{body_data['country']}')"
        )
        cursor.execute(
            f"INSERT INTO emails (email_id, email, customer_id) VALUES ('{uuid4()}', '{body_data['email']}', '{customer_id}')"
        )
        connection.commit()
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}
    
    return {"message": "User registered successfully"}

@user_router.post("/login")
async def login(body: Login):
    body_data = {
        "email": body.email,
        "phone": body.phone,
    }

    try:
        cursor.execute(
            f"SELECT email FROM emails WHERE email = '{body_data['email']}'"
        )
        email = cursor.fetchone()
        cursor.execute(
            f"SELECT phone FROM addresses WHERE phone = '{body_data['phone']}'"
        )
        address = cursor.fetchone()
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}
    
    if email and address:
        return {"message": "User logged in successfully", "data": {"email": email[0], "phone": address[0]} }
    else:
        return {"message": "User not found"}




