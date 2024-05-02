from pydantic import BaseModel
from typing import List

class FoodItem(BaseModel):
    food_id: str
    ind_price: float
    quantity: int

class Order(BaseModel):
    restaurant_id: str
    customer_id: str
    name: str
    preferences: str
    items: List[FoodItem]
