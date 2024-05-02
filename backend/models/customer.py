from pydantic import BaseModel

class Register(BaseModel):
    name: str
    email: str
    phone: str
    street: str
    city: str
    state: str
    country: str

class Login(BaseModel):
    email: str
    phone: str