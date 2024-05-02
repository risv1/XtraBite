from pydantic import BaseModel

class Restaurant(BaseModel):
    name: str
    rating: float

class Branch(BaseModel):
    restaurant_id: str
    address: str
    contact_number: str