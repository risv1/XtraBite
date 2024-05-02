from pydantic import BaseModel

class Delivery(BaseModel):
    order_id: str
    driver_id: str

class Driver(BaseModel):
    name: str
    phone: str