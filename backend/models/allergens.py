from pydantic import BaseModel

class Allergen(BaseModel):
    name: str

class AllergenSeverity(BaseModel):
    allergen_id: str
    food_id: str
    severity: float
