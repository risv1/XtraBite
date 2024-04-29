import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from database import connection

app = FastAPI()

cursor = connection.cursor()

if cursor:
    print("Connected to database")
else:
    print("Connection to database failed")
class Model(BaseModel):
    name: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/")
async def post_root(body: Model):
     return {"message": body.name}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)