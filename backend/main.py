import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.db import cursor
from routes.user_routes import user_router
from routes.restaurant_routes import restaurant_router
from routes.food_routes import food_router
from routes.order_routes import order_router
from routes.delivery_routes import delivery_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if cursor:
    print("Connected to database")
else:
    print("Connection to database failed")
    
class Model(BaseModel):
    name: str

@app.on_event("startup")
async def startup():
    app.include_router(user_router)
    app.include_router(restaurant_router)
    app.include_router(food_router)
    app.include_router(order_router)
    app.include_router(delivery_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/")
async def post_root(body: Model):
     return {"message": body.name}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)