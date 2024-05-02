from pydantic import BaseModel

class Food(BaseModel):
    name: str

class SubFood(BaseModel):
    food_id: str
    name: str
    price: float
